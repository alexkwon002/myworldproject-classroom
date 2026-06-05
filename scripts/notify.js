#!/usr/bin/env node

/**
 * 팀 작업 결과 알림 스크립트
 * 
 * 사용법:
 *   node scripts/notify.js <channel> <team> <title> <summary> [--level=critical|normal|verbose]
 * 
 * channel: slack | telegram | all
 * team: it | marketing | ad-sales | customer-service | finance | ir-pr-legal | hr
 * title: 작업 제목
 * summary: 작업 요약 (줄바꿈은 \n)
 * --level: 알림 등급 (기본: normal)
 *   - critical: 배포 완료/실패, 보안 취약점, 장애 → 항상 자동 전송
 *   - normal: Skill 결과, 리포트 → 사용자 지시 시 전송
 *   - verbose: 중간 진행 상황 → 전송 안 함 (콘솔 로그만)
 * 
 * 예시:
 *   node scripts/notify.js all "IT" "API 배포" "DEV 배포 완료" --level=critical
 *   node scripts/notify.js slack "마케팅" "콘텐츠 전략" "Q1 초안 완료"
 */

const https = require('https');
const path = require('path');
const fs = require('fs');

// .env 로드 (dotenv 없이 직접 파싱)
function loadEnv() {
  const envPath = path.resolve(__dirname, '..', '.env');
  const env = {};
  
  if (!fs.existsSync(envPath)) {
    console.warn('⚠️  .env 파일이 없습니다. MyWorldProject/.env를 생성해주세요.');
    return env;
  }
  
  const content = fs.readFileSync(envPath, 'utf8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.substring(0, eqIdx).trim();
    const value = trimmed.substring(eqIdx + 1).trim();
    env[key] = value;
  }
  return env;
}

// 현재 시각 (KST)
function getKSTTime() {
  const now = new Date();
  const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  return kst.toISOString().replace('T', ' ').substring(0, 16);
}

// 팀 정보 매핑 (Unicode 심볼 기반 고급 디자인)
const TEAM_INFO = {
  it:                 { symbol: '⬡', label: 'IT Development', color: '#2563EB' },
  marketing:          { symbol: '◈', label: 'Marketing', color: '#7C3AED' },
  'ad-sales':         { symbol: '◆', label: 'Ad Sales', color: '#059669' },
  'customer-service': { symbol: '◉', label: 'Customer Service', color: '#D97706' },
  finance:            { symbol: '▣', label: 'Finance', color: '#DC2626' },
  'ir-pr-legal':      { symbol: '◐', label: 'IR / PR / Legal', color: '#4338CA' },
  hr:                 { symbol: '◎', label: 'Human Resources', color: '#0891B2' },
};

// 알림 등급별 라벨
const LEVEL_LABEL = {
  critical: { tag: 'CRITICAL', bar: '▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬' },
  normal:   { tag: 'REPORT',   bar: '━━━━━━━━━━━━━━━━━━━━━' },
  verbose:  { tag: 'LOG',      bar: '───────────────────────' },
};

// Telegram HTML 포맷 메시지 생성
function formatTelegramHTML(team, title, summary, level) {
  const info = TEAM_INFO[team.toLowerCase()] || { symbol: '■', label: team };
  const lvl = LEVEL_LABEL[level] || LEVEL_LABEL.normal;
  const time = getKSTTime();
  const summaryLines = summary.replace(/\\n/g, '\n').split('\n')
    .map(l => `    ▸ ${escapeHTML(l)}`).join('\n');

  return [
    `${info.symbol} <b>${info.label}</b>  <code>[${lvl.tag}]</code>`,
    `${lvl.bar}`,
    ``,
    `<b>${escapeHTML(title)}</b>`,
    ``,
    `┌─ Summary`,
    `${summaryLines}`,
    `└─`,
    ``,
    `<code>${time} KST</code>  ·  <i>MyWorldProject</i>`,
  ].join('\n');
}

// Slack 텍스트 포맷 메시지 생성
function formatSlackText(team, title, summary, level) {
  const info = TEAM_INFO[team.toLowerCase()] || { symbol: '■', label: team };
  const lvl = LEVEL_LABEL[level] || LEVEL_LABEL.normal;
  const time = getKSTTime();
  const summaryLines = summary.replace(/\\n/g, '\n').split('\n')
    .map(l => `    ▸ ${l}`).join('\n');

  return [
    `${info.symbol} *${info.label}*  \`[${lvl.tag}]\``,
    `${lvl.bar}`,
    ``,
    `*${title}*`,
    ``,
    `┌─ Summary`,
    `${summaryLines}`,
    `└─`,
    ``,
    `\`${time} KST\`  ·  _MyWorldProject_`,
  ].join('\n');
}

// 콘솔 미리보기 포맷
function formatConsole(team, title, summary, level) {
  const info = TEAM_INFO[team.toLowerCase()] || { symbol: '■', label: team };
  const lvl = LEVEL_LABEL[level] || LEVEL_LABEL.normal;
  const time = getKSTTime();
  const summaryLines = summary.replace(/\\n/g, '\n').split('\n')
    .map(l => `    ▸ ${l}`).join('\n');

  return [
    `${info.symbol} ${info.label}  [${lvl.tag}]`,
    `${lvl.bar}`,
    ``,
    `${title}`,
    ``,
    `┌─ Summary`,
    `${summaryLines}`,
    `└─`,
    ``,
    `${time} KST  ·  MyWorldProject`,
  ].join('\n');
}

// HTML 이스케이프
function escapeHTML(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Slack Webhook 전송
function sendSlack(webhookUrl, message) {
  return new Promise((resolve, reject) => {
    const url = new URL(webhookUrl);
    const payload = JSON.stringify({ text: message });

    const req = https.request({
      hostname: url.hostname,
      path: url.pathname,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log('✅ Slack 전송 완료');
          resolve();
        } else {
          reject(new Error(`Slack 전송 실패 (${res.statusCode}): ${body}`));
        }
      });
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

// Telegram Bot API 전송
function sendTelegram(botToken, chatId, message) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML',
    });

    const req = https.request({
      hostname: 'api.telegram.org',
      path: `/bot${botToken}/sendMessage`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log('✅ Telegram 전송 완료');
          resolve();
        } else {
          reject(new Error(`Telegram 전송 실패 (${res.statusCode}): ${body}`));
        }
      });
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

// --level 파싱
function parseLevel(args) {
  const levelArg = args.find(a => a.startsWith('--level='));
  if (!levelArg) return 'normal';
  const val = levelArg.split('=')[1];
  return ['critical', 'normal', 'verbose'].includes(val) ? val : 'normal';
}

// 메인 실행
async function main() {
  const args = process.argv.slice(2);
  const positional = args.filter(a => !a.startsWith('--'));
  const [channel, team, title, summary] = positional;
  const level = parseLevel(args);

  if (!channel || !team || !title || !summary) {
    console.log(`
사용법: node scripts/notify.js <channel> <team> <title> <summary> [--level=critical|normal|verbose]

  channel:  slack | telegram | all
  team:     팀명 (it, marketing, ad-sales, customer-service, finance, ir-pr-legal, hr)
  title:    작업 제목
  summary:  작업 요약 (줄바꿈은 \\n)
  --level:  알림 등급 (기본: normal)
            critical  → 배포/보안/장애 (항상 자동 전송)
            normal    → Skill 결과/리포트 (사용자 지시 시 전송)
            verbose   → 중간 진행 상황 (콘솔만, 전송 안 함)

예시:
  node scripts/notify.js all "IT" "API 배포" "v1.2.0 DEV 배포 완료" --level=critical
  node scripts/notify.js slack "마케팅" "콘텐츠 전략" "Q1 전략 초안 완료"
`);
    process.exit(1);
  }

  // verbose 등급은 콘솔 출력만
  if (level === 'verbose') {
    console.log('\n── verbose (콘솔만 출력) ──\n');
    console.log(formatConsole(team, title, summary, level));
    console.log('\n▸ verbose 등급은 외부 전송하지 않습니다.');
    process.exit(0);
  }

  const env = loadEnv();

  console.log(`\n── 미리보기 [${level.toUpperCase()}] ──\n`);
  console.log(formatConsole(team, title, summary, level));
  console.log('');

  const tasks = [];

  if (channel === 'slack' || channel === 'all') {
    if (!env.SLACK_WEBHOOK_URL) {
      console.error('❌ SLACK_WEBHOOK_URL이 .env에 설정되지 않았습니다.');
    } else {
      tasks.push(sendSlack(env.SLACK_WEBHOOK_URL, formatSlackText(team, title, summary, level)));
    }
  }

  if (channel === 'telegram' || channel === 'all') {
    if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
      console.error('❌ TELEGRAM_BOT_TOKEN 또는 TELEGRAM_CHAT_ID가 .env에 설정되지 않았습니다.');
    } else {
      tasks.push(sendTelegram(env.TELEGRAM_BOT_TOKEN, env.TELEGRAM_CHAT_ID, formatTelegramHTML(team, title, summary, level)));
    }
  }

  if (tasks.length === 0) {
    console.log('⚠️  전송할 채널이 없습니다. .env 파일을 확인해주세요.');
    process.exit(1);
  }

  try {
    await Promise.all(tasks);
    console.log('\n── 전송 완료 ──');
  } catch (err) {
    console.error('\n❌ 전송 중 오류:', err.message);
    process.exit(1);
  }
}

main();
