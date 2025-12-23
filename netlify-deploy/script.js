// ============================================
// What Eat? - 図形選択式 深層心理診断
// 60種類以上の具体的なメニューから診断
// ============================================

// テーマ切り替え
const themeToggle = document.getElementById('theme-toggle');
let isDark = localStorage.getItem('theme') === 'dark';

function setTheme(dark) {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
    isDark = dark;
    
    if (document.getElementById('result-screen').classList.contains('active')) {
        setTimeout(() => drawRadarChart(lastScores), 50);
    }
}

setTheme(isDark);
themeToggle.addEventListener('click', () => setTheme(!isDark));

// ============================================
// 音声管理
// ============================================

const bgm = document.getElementById('bgm');
const sfxSelect = document.getElementById('sfx-select');
const sfxResult = document.getElementById('sfx-result');
const muteBtn = document.getElementById('mute-toggle');

let isMuted = localStorage.getItem('muted') === 'true';
let audioStarted = false;

// BGM音量設定
bgm.volume = 0.3;
sfxSelect.volume = 0.5;
sfxResult.volume = 0.6;

function updateMuteUI() {
    if (isMuted) {
        muteBtn.classList.add('muted');
        bgm.pause();
    } else {
        muteBtn.classList.remove('muted');
        if (audioStarted) {
            bgm.play().catch(() => {});
        }
    }
}

function toggleMute() {
    isMuted = !isMuted;
    localStorage.setItem('muted', isMuted);
    updateMuteUI();
}

function startAudio() {
    if (audioStarted) return;
    audioStarted = true;
    if (!isMuted) {
        bgm.play().catch(() => {});
    }
}

function playSelect() {
    if (isMuted) return;
    sfxSelect.currentTime = 0;
    sfxSelect.play().catch(() => {});
}

function playResult() {
    if (isMuted) return;
    sfxResult.currentTime = 0;
    sfxResult.play().catch(() => {});
}

updateMuteUI();
muteBtn.addEventListener('click', toggleMute);

// ============================================
// 質問データ（図形心理学ベース）
// 5軸: satiety(満腹), warmth(温度), stimulation(刺激), comfort(安心), social(社交)
// ============================================

const questions = [
    // Q1: 基本図形 - 形の丸み・鋭さで欲求を測定
    {
        hint: "直感で選んで",
        options: [
            {
                // 円: 丸み=安心・満足・包容
                svg: `<svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="25" stroke-width="2"/></svg>`,
                scores: { satiety: 1, warmth: 1, stimulation: -2, comfort: 3, social: 1 }
            },
            {
                // 三角: 鋭さ=刺激・エネルギー・挑戦
                svg: `<svg viewBox="0 0 60 60"><polygon points="30,5 55,55 5,55" stroke-width="2"/></svg>`,
                scores: { satiety: -1, warmth: -1, stimulation: 3, comfort: -2, social: 0 }
            },
            {
                // 四角: 安定=伝統・バランス・秩序
                svg: `<svg viewBox="0 0 60 60"><rect x="8" y="8" width="44" height="44" stroke-width="2"/></svg>`,
                scores: { satiety: 1, warmth: 1, stimulation: -1, comfort: 2, social: 0 }
            },
            {
                // 波線: 流動=軽やか・自由・フレッシュ
                svg: `<svg viewBox="0 0 60 60"><path d="M5,30 Q20,10 30,30 T55,30" stroke-width="2"/></svg>`,
                scores: { satiety: -2, warmth: -1, stimulation: 1, comfort: 0, social: 0 }
            }
        ]
    },
    // Q2: パターン - 線の方向と配置で状態を測定
    {
        hint: "直感で選んで",
        options: [
            {
                // 縦線: 上昇・活力・独立
                svg: `<svg viewBox="0 0 60 60"><line x1="15" y1="5" x2="15" y2="55" stroke-width="2"/><line x1="30" y1="5" x2="30" y2="55" stroke-width="2"/><line x1="45" y1="5" x2="45" y2="55" stroke-width="2"/></svg>`,
                scores: { satiety: -1, warmth: -1, stimulation: 2, comfort: -1, social: -2 }
            },
            {
                // 横線: 安定・落ち着き・地に足
                svg: `<svg viewBox="0 0 60 60"><line x1="5" y1="15" x2="55" y2="15" stroke-width="2"/><line x1="5" y1="30" x2="55" y2="30" stroke-width="2"/><line x1="5" y1="45" x2="55" y2="45" stroke-width="2"/></svg>`,
                scores: { satiety: 1, warmth: 2, stimulation: -2, comfort: 2, social: 0 }
            },
            {
                // ドットグリッド: 規則性・社交・共有
                svg: `<svg viewBox="0 0 60 60"><circle cx="15" cy="15" r="3" class="filled"/><circle cx="30" cy="15" r="3" class="filled"/><circle cx="45" cy="15" r="3" class="filled"/><circle cx="15" cy="30" r="3" class="filled"/><circle cx="30" cy="30" r="3" class="filled"/><circle cx="45" cy="30" r="3" class="filled"/><circle cx="15" cy="45" r="3" class="filled"/><circle cx="30" cy="45" r="3" class="filled"/><circle cx="45" cy="45" r="3" class="filled"/></svg>`,
                scores: { satiety: 0, warmth: 0, stimulation: 0, comfort: 1, social: 3 }
            },
            {
                // 有機的形状: 温もり・包容・満足
                svg: `<svg viewBox="0 0 60 60"><path d="M30,5 Q55,20 45,35 Q35,50 30,55 Q25,50 15,35 Q5,20 30,5" stroke-width="2"/></svg>`,
                scores: { satiety: 2, warmth: 3, stimulation: 0, comfort: 2, social: 1 }
            }
        ]
    },
    // Q3: 線の太さ - ボリューム感・重さの欲求
    {
        hint: "直感で選んで",
        options: [
            {
                // 太い線: 重さ・ボリューム・満足
                svg: `<svg viewBox="0 0 60 60"><line x1="10" y1="30" x2="50" y2="30" stroke-width="8"/></svg>`,
                scores: { satiety: 3, warmth: 1, stimulation: -1, comfort: 1, social: 0 }
            },
            {
                // 細い線: 軽さ・繊細・ヘルシー
                svg: `<svg viewBox="0 0 60 60"><line x1="10" y1="30" x2="50" y2="30" stroke-width="1"/></svg>`,
                scores: { satiety: -3, warmth: -1, stimulation: 0, comfort: 0, social: 0 }
            },
            {
                // 曲線: 柔らかさ・温かさ・心地よさ
                svg: `<svg viewBox="0 0 60 60"><path d="M10,40 Q30,10 50,40" stroke-width="2"/></svg>`,
                scores: { satiety: 0, warmth: 2, stimulation: 0, comfort: 2, social: 1 }
            },
            {
                // 斜め線: 動き・変化・刺激
                svg: `<svg viewBox="0 0 60 60"><line x1="10" y1="50" x2="50" y2="10" stroke-width="2"/></svg>`,
                scores: { satiety: 0, warmth: -1, stimulation: 3, comfort: -1, social: 0 }
            }
        ]
    },
    // Q4: ドットの配置 - 社交性・まとまり
    {
        hint: "直感で選んで",
        options: [
            {
                // 密集: 賑やか・共有・一体感
                svg: `<svg viewBox="0 0 60 60"><circle cx="25" cy="25" r="4" class="filled"/><circle cx="35" cy="25" r="4" class="filled"/><circle cx="25" cy="35" r="4" class="filled"/><circle cx="35" cy="35" r="4" class="filled"/><circle cx="30" cy="30" r="4" class="filled"/></svg>`,
                scores: { satiety: 1, warmth: 2, stimulation: 0, comfort: 1, social: 3 }
            },
            {
                // 散らばり: 個人・自由・冒険
                svg: `<svg viewBox="0 0 60 60"><circle cx="10" cy="15" r="3" class="filled"/><circle cx="50" cy="45" r="3" class="filled"/><circle cx="25" cy="50" r="3" class="filled"/><circle cx="45" cy="12" r="3" class="filled"/></svg>`,
                scores: { satiety: -1, warmth: -1, stimulation: 2, comfort: -1, social: -3 }
            },
            {
                // 一列: 秩序・バランス・安定
                svg: `<svg viewBox="0 0 60 60"><circle cx="15" cy="30" r="4" class="filled"/><circle cx="30" cy="30" r="4" class="filled"/><circle cx="45" cy="30" r="4" class="filled"/></svg>`,
                scores: { satiety: 0, warmth: 0, stimulation: -1, comfort: 3, social: 0 }
            },
            {
                // ランダム多め: 多様性・刺激・賑やか
                svg: `<svg viewBox="0 0 60 60"><circle cx="12" cy="20" r="3" class="filled"/><circle cx="28" cy="12" r="3" class="filled"/><circle cx="48" cy="25" r="3" class="filled"/><circle cx="20" cy="42" r="3" class="filled"/><circle cx="40" cy="48" r="3" class="filled"/><circle cx="35" cy="32" r="3" class="filled"/></svg>`,
                scores: { satiety: 0, warmth: 0, stimulation: 3, comfort: -2, social: 1 }
            }
        ]
    },
    // Q5: 方向性 - エネルギーの向き
    {
        hint: "直感で選んで",
        options: [
            {
                // 上向き矢印: 活性化・上昇・軽さ
                svg: `<svg viewBox="0 0 60 60"><line x1="30" y1="50" x2="30" y2="15" stroke-width="2"/><polyline points="20,25 30,10 40,25" stroke-width="2"/></svg>`,
                scores: { satiety: -2, warmth: -1, stimulation: 2, comfort: -1, social: 0 }
            },
            {
                // 下向き矢印: 落ち着き・グラウンディング・満足
                svg: `<svg viewBox="0 0 60 60"><line x1="30" y1="10" x2="30" y2="45" stroke-width="2"/><polyline points="20,35 30,50 40,35" stroke-width="2"/></svg>`,
                scores: { satiety: 3, warmth: 2, stimulation: -2, comfort: 2, social: 0 }
            },
            {
                // 円+中心点: 集中・一体・社交
                svg: `<svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="18" stroke-width="2"/><circle cx="30" cy="30" r="4" class="filled"/></svg>`,
                scores: { satiety: 0, warmth: 1, stimulation: 0, comfort: 1, social: 2 }
            },
            {
                // 塗りつぶし円: 満足・充足・完結
                svg: `<svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="12" class="filled"/></svg>`,
                scores: { satiety: 2, warmth: 1, stimulation: -1, comfort: 3, social: -1 }
            }
        ]
    },
    // Q6: 塗りのパターン - 満たされ度・完成度
    {
        hint: "直感で選んで",
        options: [
            {
                // 塗りつぶし四角: 完全・充足・ガッツリ
                svg: `<svg viewBox="0 0 60 60"><rect x="10" y="10" width="40" height="40" stroke-width="2" class="filled"/></svg>`,
                scores: { satiety: 3, warmth: 2, stimulation: -1, comfort: 2, social: 0 }
            },
            {
                // 枠のみ: 軽さ・余白・ヘルシー
                svg: `<svg viewBox="0 0 60 60"><rect x="10" y="10" width="40" height="40" stroke-width="2"/></svg>`,
                scores: { satiety: -2, warmth: 0, stimulation: 0, comfort: 1, social: 0 }
            },
            {
                // 半分塗り: バランス・中庸・適度
                svg: `<svg viewBox="0 0 60 60"><rect x="10" y="10" width="40" height="40" stroke-width="2"/><rect x="10" y="30" width="40" height="20" class="filled"/></svg>`,
                scores: { satiety: 1, warmth: 1, stimulation: 0, comfort: 1, social: 0 }
            },
            {
                // グラデーション: 変化・多様・刺激
                svg: `<svg viewBox="0 0 60 60"><rect x="10" y="10" width="40" height="40" stroke-width="2"/><line x1="10" y1="42" x2="50" y2="42" stroke-width="6"/><line x1="10" y1="34" x2="50" y2="34" stroke-width="4"/><line x1="10" y1="26" x2="50" y2="26" stroke-width="2"/><line x1="10" y1="18" x2="50" y2="18" stroke-width="1"/></svg>`,
                scores: { satiety: 0, warmth: 0, stimulation: 2, comfort: 0, social: 2 }
            }
        ]
    }
];

// ============================================
// 食べ物データベース（心理学的5軸プロファイル）
// satiety: 満腹度 (-3軽め〜+3ガッツリ)
// warmth: 温度 (-3冷たい〜+3温かい)
// stimulation: 刺激 (-3マイルド〜+3スパイシー/刺激的)
// comfort: 安心感 (-3冒険的〜+3定番・安心)
// social: 社交性 (-3一人向け〜+3シェア向け)
// ============================================

const foods = [
    // ===== ガッツリ温かい定番 (高satiety, 高warmth, 高comfort) =====
    { name: "味噌ラーメン", profile: { satiety: 3, warmth: 3, stimulation: 0, comfort: 3, social: 0 } },
    { name: "豚骨ラーメン", profile: { satiety: 3, warmth: 3, stimulation: 0, comfort: 2, social: 0 } },
    { name: "カツカレー", profile: { satiety: 3, warmth: 3, stimulation: 1, comfort: 3, social: 0 } },
    { name: "ビーフカレー", profile: { satiety: 2, warmth: 3, stimulation: 1, comfort: 3, social: 0 } },
    { name: "カツ丼", profile: { satiety: 3, warmth: 2, stimulation: 0, comfort: 3, social: -1 } },
    { name: "牛丼", profile: { satiety: 2, warmth: 2, stimulation: 0, comfort: 3, social: -1 } },
    { name: "親子丼", profile: { satiety: 2, warmth: 2, stimulation: -1, comfort: 3, social: -1 } },
    { name: "天丼", profile: { satiety: 2, warmth: 2, stimulation: 0, comfort: 2, social: 0 } },
    { name: "鍋焼きうどん", profile: { satiety: 2, warmth: 3, stimulation: -1, comfort: 3, social: 0 } },
    { name: "肉うどん", profile: { satiety: 2, warmth: 3, stimulation: 0, comfort: 3, social: 0 } },
    { name: "すき焼き", profile: { satiety: 3, warmth: 3, stimulation: 0, comfort: 2, social: 3 } },
    { name: "しゃぶしゃぶ", profile: { satiety: 2, warmth: 3, stimulation: 0, comfort: 2, social: 3 } },
    { name: "もつ鍋", profile: { satiety: 2, warmth: 3, stimulation: 1, comfort: 1, social: 3 } },
    { name: "キムチ鍋", profile: { satiety: 2, warmth: 3, stimulation: 2, comfort: 1, social: 3 } },
    { name: "おでん", profile: { satiety: 1, warmth: 3, stimulation: -2, comfort: 3, social: 1 } },

    // ===== 刺激的な料理 (高stimulation) =====
    { name: "担々麺", profile: { satiety: 2, warmth: 3, stimulation: 3, comfort: 1, social: 0 } },
    { name: "麻婆豆腐", profile: { satiety: 1, warmth: 3, stimulation: 3, comfort: 1, social: 1 } },
    { name: "台湾ラーメン", profile: { satiety: 2, warmth: 3, stimulation: 3, comfort: 0, social: 0 } },
    { name: "グリーンカレー", profile: { satiety: 2, warmth: 3, stimulation: 3, comfort: 0, social: 0 } },
    { name: "トムヤムクン", profile: { satiety: 1, warmth: 3, stimulation: 3, comfort: -1, social: 1 } },
    { name: "エビチリ", profile: { satiety: 1, warmth: 2, stimulation: 2, comfort: 1, social: 2 } },
    { name: "回鍋肉", profile: { satiety: 2, warmth: 2, stimulation: 2, comfort: 1, social: 1 } },
    { name: "火鍋", profile: { satiety: 2, warmth: 3, stimulation: 3, comfort: 0, social: 3 } },
    { name: "激辛ラーメン", profile: { satiety: 2, warmth: 3, stimulation: 3, comfort: -1, social: 0 } },
    { name: "ペペロンチーノ", profile: { satiety: 1, warmth: 2, stimulation: 2, comfort: 1, social: 0 } },

    // ===== さっぱり軽め (低satiety, マイルド) =====
    { name: "ざるそば", profile: { satiety: -1, warmth: -2, stimulation: -2, comfort: 3, social: -1 } },
    { name: "ざるうどん", profile: { satiety: 0, warmth: -2, stimulation: -2, comfort: 3, social: -1 } },
    { name: "冷やし中華", profile: { satiety: 0, warmth: -3, stimulation: 0, comfort: 2, social: 0 } },
    { name: "そうめん", profile: { satiety: -1, warmth: -3, stimulation: -2, comfort: 3, social: 0 } },
    { name: "サラダうどん", profile: { satiety: 0, warmth: -1, stimulation: -1, comfort: 1, social: 0 } },
    { name: "冷しゃぶサラダ", profile: { satiety: 0, warmth: -2, stimulation: -1, comfort: 1, social: 0 } },
    { name: "シーザーサラダ", profile: { satiety: -1, warmth: -1, stimulation: -1, comfort: 1, social: 1 } },
    { name: "ポキ丼", profile: { satiety: 0, warmth: -1, stimulation: 0, comfort: 0, social: 0 } },
    { name: "アサイーボウル", profile: { satiety: -1, warmth: -2, stimulation: 0, comfort: -1, social: 0 } },
    { name: "スムージー", profile: { satiety: -2, warmth: -3, stimulation: 0, comfort: 0, social: 0 } },

    // ===== 寿司・海鮮 (さっぱり〜中程度) =====
    { name: "握り寿司", profile: { satiety: 1, warmth: -1, stimulation: 0, comfort: 2, social: 2 } },
    { name: "海鮮丼", profile: { satiety: 1, warmth: -1, stimulation: 0, comfort: 2, social: 0 } },
    { name: "サーモン丼", profile: { satiety: 1, warmth: -1, stimulation: -1, comfort: 2, social: 0 } },
    { name: "まぐろ丼", profile: { satiety: 1, warmth: -1, stimulation: 0, comfort: 2, social: 0 } },
    { name: "ネギトロ丼", profile: { satiety: 1, warmth: -1, stimulation: 0, comfort: 2, social: 0 } },
    { name: "ちらし寿司", profile: { satiety: 1, warmth: -1, stimulation: 0, comfort: 2, social: 1 } },
    { name: "刺身定食", profile: { satiety: 1, warmth: -1, stimulation: 0, comfort: 2, social: 0 } },
    { name: "うな丼", profile: { satiety: 2, warmth: 2, stimulation: 0, comfort: 2, social: 0 } },

    // ===== パスタ系 (バリエーション豊か) =====
    { name: "カルボナーラ", profile: { satiety: 2, warmth: 2, stimulation: -1, comfort: 2, social: 0 } },
    { name: "ミートソース", profile: { satiety: 2, warmth: 2, stimulation: 0, comfort: 3, social: 0 } },
    { name: "ナポリタン", profile: { satiety: 2, warmth: 2, stimulation: 0, comfort: 3, social: 0 } },
    { name: "ボンゴレビアンコ", profile: { satiety: 1, warmth: 2, stimulation: 0, comfort: 1, social: 0 } },
    { name: "ジェノベーゼ", profile: { satiety: 1, warmth: 2, stimulation: 0, comfort: 1, social: 0 } },
    { name: "たらこパスタ", profile: { satiety: 1, warmth: 2, stimulation: 0, comfort: 2, social: 0 } },
    { name: "明太子パスタ", profile: { satiety: 1, warmth: 2, stimulation: 1, comfort: 2, social: 0 } },
    { name: "アラビアータ", profile: { satiety: 1, warmth: 2, stimulation: 2, comfort: 1, social: 0 } },
    { name: "ラザニア", profile: { satiety: 3, warmth: 3, stimulation: 0, comfort: 2, social: 1 } },

    // ===== 中華・アジアン (シェア向け多め) =====
    { name: "餃子", profile: { satiety: 1, warmth: 2, stimulation: 0, comfort: 2, social: 3 } },
    { name: "焼き餃子", profile: { satiety: 1, warmth: 2, stimulation: 0, comfort: 2, social: 3 } },
    { name: "酢豚", profile: { satiety: 2, warmth: 2, stimulation: 0, comfort: 1, social: 2 } },
    { name: "青椒肉絲", profile: { satiety: 1, warmth: 2, stimulation: 0, comfort: 1, social: 2 } },
    { name: "チャーハン", profile: { satiety: 2, warmth: 2, stimulation: 0, comfort: 2, social: 0 } },
    { name: "天津飯", profile: { satiety: 2, warmth: 2, stimulation: 0, comfort: 2, social: 0 } },
    { name: "中華丼", profile: { satiety: 2, warmth: 2, stimulation: 0, comfort: 2, social: 0 } },
    { name: "春巻き", profile: { satiety: 1, warmth: 2, stimulation: 0, comfort: 1, social: 2 } },
    { name: "小籠包", profile: { satiety: 1, warmth: 3, stimulation: 0, comfort: 1, social: 2 } },
    { name: "フォー", profile: { satiety: 1, warmth: 3, stimulation: 0, comfort: 0, social: 0 } },
    { name: "パッタイ", profile: { satiety: 1, warmth: 1, stimulation: 1, comfort: 0, social: 0 } },
    { name: "ガパオライス", profile: { satiety: 2, warmth: 2, stimulation: 2, comfort: 0, social: 0 } },
    { name: "カオマンガイ", profile: { satiety: 2, warmth: 2, stimulation: 0, comfort: 0, social: 0 } },
    { name: "ビビンバ", profile: { satiety: 2, warmth: 2, stimulation: 1, comfort: 1, social: 0 } },
    { name: "サムギョプサル", profile: { satiety: 2, warmth: 2, stimulation: 1, comfort: 0, social: 3 } },

    // ===== 洋食定番 (高comfort) =====
    { name: "ハンバーグ", profile: { satiety: 2, warmth: 2, stimulation: 0, comfort: 3, social: 0 } },
    { name: "オムライス", profile: { satiety: 2, warmth: 2, stimulation: 0, comfort: 3, social: 0 } },
    { name: "ドリア", profile: { satiety: 2, warmth: 3, stimulation: 0, comfort: 2, social: 0 } },
    { name: "グラタン", profile: { satiety: 2, warmth: 3, stimulation: 0, comfort: 2, social: 0 } },
    { name: "ビーフシチュー", profile: { satiety: 2, warmth: 3, stimulation: 0, comfort: 2, social: 0 } },
    { name: "クリームシチュー", profile: { satiety: 2, warmth: 3, stimulation: -1, comfort: 3, social: 1 } },
    { name: "コロッケ", profile: { satiety: 1, warmth: 2, stimulation: 0, comfort: 3, social: 0 } },
    { name: "エビフライ", profile: { satiety: 1, warmth: 2, stimulation: 0, comfort: 2, social: 0 } },
    { name: "とんかつ", profile: { satiety: 2, warmth: 2, stimulation: 0, comfort: 2, social: 0 } },
    { name: "チキンカツ", profile: { satiety: 2, warmth: 2, stimulation: 0, comfort: 2, social: 0 } },
    { name: "唐揚げ", profile: { satiety: 2, warmth: 2, stimulation: 0, comfort: 3, social: 1 } },
    { name: "フライドチキン", profile: { satiety: 2, warmth: 2, stimulation: 0, comfort: 2, social: 2 } },

    // ===== ハンバーガー・ピザ (カジュアル・シェア) =====
    { name: "チーズバーガー", profile: { satiety: 2, warmth: 1, stimulation: 0, comfort: 2, social: 0 } },
    { name: "ダブルチーズバーガー", profile: { satiety: 3, warmth: 1, stimulation: 0, comfort: 2, social: 0 } },
    { name: "ベーコンバーガー", profile: { satiety: 3, warmth: 1, stimulation: 0, comfort: 2, social: 0 } },
    { name: "テリヤキバーガー", profile: { satiety: 2, warmth: 1, stimulation: 0, comfort: 2, social: 0 } },
    { name: "マルゲリータピザ", profile: { satiety: 2, warmth: 2, stimulation: 0, comfort: 2, social: 3 } },
    { name: "ペパロニピザ", profile: { satiety: 2, warmth: 2, stimulation: 1, comfort: 2, social: 3 } },
    { name: "クアトロフォルマッジ", profile: { satiety: 2, warmth: 2, stimulation: 0, comfort: 1, social: 2 } },
    { name: "シーフードピザ", profile: { satiety: 2, warmth: 2, stimulation: 0, comfort: 1, social: 3 } },

    // ===== 和食定番 (高comfort) =====
    { name: "焼き魚定食", profile: { satiety: 1, warmth: 2, stimulation: -1, comfort: 3, social: -1 } },
    { name: "生姜焼き定食", profile: { satiety: 2, warmth: 2, stimulation: 0, comfort: 3, social: -1 } },
    { name: "肉じゃが", profile: { satiety: 2, warmth: 2, stimulation: -1, comfort: 3, social: 1 } },
    { name: "味噌汁", profile: { satiety: 0, warmth: 3, stimulation: -2, comfort: 3, social: 0 } },
    { name: "豚汁", profile: { satiety: 1, warmth: 3, stimulation: -1, comfort: 3, social: 0 } },
    { name: "けんちん汁", profile: { satiety: 1, warmth: 3, stimulation: -2, comfort: 3, social: 0 } },
    { name: "お茶漬け", profile: { satiety: 0, warmth: 2, stimulation: -2, comfort: 3, social: -2 } },
    { name: "おにぎり", profile: { satiety: 1, warmth: 0, stimulation: -2, comfort: 3, social: -1 } },
    { name: "卵かけご飯", profile: { satiety: 1, warmth: 1, stimulation: -2, comfort: 3, social: -2 } },
    { name: "納豆ご飯", profile: { satiety: 1, warmth: 1, stimulation: -1, comfort: 3, social: -2 } },
    { name: "焼き鳥", profile: { satiety: 1, warmth: 2, stimulation: 0, comfort: 2, social: 3 } },
    { name: "焼き鳥丼", profile: { satiety: 2, warmth: 2, stimulation: 0, comfort: 2, social: 0 } },

    // ===== 焼肉・ステーキ (ガッツリ・社交的) =====
    { name: "焼肉", profile: { satiety: 3, warmth: 2, stimulation: 1, comfort: 1, social: 3 } },
    { name: "カルビ", profile: { satiety: 3, warmth: 2, stimulation: 0, comfort: 1, social: 2 } },
    { name: "ハラミ", profile: { satiety: 2, warmth: 2, stimulation: 0, comfort: 1, social: 2 } },
    { name: "タン塩", profile: { satiety: 1, warmth: 2, stimulation: 0, comfort: 1, social: 2 } },
    { name: "ステーキ", profile: { satiety: 3, warmth: 2, stimulation: 0, comfort: 1, social: 0 } },
    { name: "ローストビーフ丼", profile: { satiety: 2, warmth: 0, stimulation: 0, comfort: 1, social: 0 } },
    { name: "ハンバーグステーキ", profile: { satiety: 2, warmth: 2, stimulation: 0, comfort: 2, social: 0 } },

    // ===== 軽食・スナック =====
    { name: "たこ焼き", profile: { satiety: 0, warmth: 2, stimulation: 0, comfort: 2, social: 2 } },
    { name: "お好み焼き", profile: { satiety: 2, warmth: 2, stimulation: 0, comfort: 2, social: 2 } },
    { name: "もんじゃ焼き", profile: { satiety: 1, warmth: 2, stimulation: 0, comfort: 1, social: 3 } },
    { name: "焼きそば", profile: { satiety: 2, warmth: 2, stimulation: 0, comfort: 2, social: 1 } },
    { name: "サンドイッチ", profile: { satiety: 0, warmth: 0, stimulation: -1, comfort: 2, social: 0 } },
    { name: "ホットドッグ", profile: { satiety: 1, warmth: 1, stimulation: 0, comfort: 2, social: 0 } },
    { name: "フライドポテト", profile: { satiety: 0, warmth: 2, stimulation: 0, comfort: 2, social: 2 } },
    { name: "チキンナゲット", profile: { satiety: 0, warmth: 2, stimulation: 0, comfort: 2, social: 2 } },
    { name: "肉まん", profile: { satiety: 1, warmth: 2, stimulation: -1, comfort: 2, social: 0 } },
    { name: "カレーパン", profile: { satiety: 1, warmth: 2, stimulation: 1, comfort: 2, social: 0 } },

    // ===== 冒険的・エスニック (低comfort, 高stimulation) =====
    { name: "タコス", profile: { satiety: 1, warmth: 1, stimulation: 2, comfort: 0, social: 2 } },
    { name: "ブリトー", profile: { satiety: 2, warmth: 1, stimulation: 1, comfort: 0, social: 0 } },
    { name: "ナシゴレン", profile: { satiety: 2, warmth: 2, stimulation: 1, comfort: -1, social: 0 } },
    { name: "ケバブ", profile: { satiety: 2, warmth: 2, stimulation: 1, comfort: 0, social: 0 } },
    { name: "フムス", profile: { satiety: 0, warmth: 0, stimulation: 0, comfort: -1, social: 2 } },
    { name: "ファラフェル", profile: { satiety: 1, warmth: 2, stimulation: 1, comfort: -1, social: 0 } },
    { name: "バインミー", profile: { satiety: 1, warmth: 0, stimulation: 1, comfort: -1, social: 0 } },

    // ===== 一人でじっくり (低social) =====
    { name: "かけうどん", profile: { satiety: 0, warmth: 2, stimulation: -2, comfort: 3, social: -2 } },
    { name: "きつねうどん", profile: { satiety: 1, warmth: 2, stimulation: -2, comfort: 3, social: -2 } },
    { name: "かけそば", profile: { satiety: 0, warmth: 2, stimulation: -2, comfort: 3, social: -2 } },
    { name: "月見そば", profile: { satiety: 1, warmth: 2, stimulation: -2, comfort: 3, social: -2 } },
    { name: "塩ラーメン", profile: { satiety: 1, warmth: 3, stimulation: -1, comfort: 2, social: -1 } },
    { name: "醤油ラーメン", profile: { satiety: 2, warmth: 3, stimulation: 0, comfort: 3, social: 0 } }
];


// 状態管理
let currentQuestion = 0;
let answers = [];
let totalScores = { satiety: 0, warmth: 0, stimulation: 0, comfort: 0, social: 0 };
let lastScores = null;
let resultFood = null;

// DOM
const screens = {
    start: document.getElementById('start-screen'),
    question: document.getElementById('question-screen'),
    analyzing: document.getElementById('analyzing-screen'),
    result: document.getElementById('result-screen')
};

function showScreen(name) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[name].classList.add('active');
}

// 配列をシャッフル（Fisher-Yates）
function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// 現在の質問のシャッフルされた選択肢を保持
let shuffledOptions = [];

function showQuestion(index) {
    const q = questions[index];
    document.getElementById('progress-text').textContent = `${index + 1} / ${questions.length}`;
    document.getElementById('progress-fill').style.width = `${((index + 1) / questions.length) * 100}%`;
    document.getElementById('question-hint').textContent = q.hint;

    const backBtn = document.getElementById('back-btn');
    backBtn.classList.toggle('visible', index > 0);

    // 選択肢をシャッフル
    shuffledOptions = shuffle(q.options);

    const optionsEl = document.getElementById('options');
    optionsEl.innerHTML = '';

    shuffledOptions.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'option';
        btn.innerHTML = opt.svg;
        btn.addEventListener('click', () => selectOption(i));
        optionsEl.appendChild(btn);
    });
}

function selectOption(index) {
    playSelect();
    const opt = shuffledOptions[index];

    Object.keys(opt.scores).forEach(key => {
        totalScores[key] += opt.scores[key];
    });

    answers.push({ questionIndex: currentQuestion, optionIndex: index, scores: { ...opt.scores } });

    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion(currentQuestion);
    } else {
        showAnalyzing();
    }
}

function goBack() {
    if (currentQuestion > 0) {
        currentQuestion--;
        const last = answers.pop();
        if (last) {
            Object.keys(last.scores).forEach(key => {
                totalScores[key] -= last.scores[key];
            });
        }
        showQuestion(currentQuestion);
    }
}

function showAnalyzing() {
    showScreen('analyzing');
    setTimeout(showResult, 1500);
}

function applyTimeAdjustment() {
    const hour = new Date().getHours();
    // 夜間（18:00-04:00）: 温かさ・安心感を求める傾向
    if (hour >= 18 || hour <= 4) {
        totalScores.warmth += 1;
        totalScores.comfort += 0.5;
        totalScores.satiety += 0.5;
    // 朝（05:00-10:00）: 軽め・刺激を求める傾向
    } else if (hour >= 5 && hour <= 10) {
        totalScores.satiety -= 0.5;
        totalScores.stimulation += 0.5;
    }
}

function calculateResult() {
    applyTimeAdjustment();
    
    let results = foods.map(food => {
        let dist = 0;
        Object.keys(totalScores).forEach(key => {
            dist += Math.pow(totalScores[key] - food.profile[key], 2);
        });
        return { food, score: 1 / (1 + Math.sqrt(dist)) };
    });
    
    results.sort((a, b) => b.score - a.score);
    return { first: results[0].food, second: results[1].food };
}

function drawRadarChart(scores) {
    const canvas = document.getElementById('radar-chart');
    const ctx = canvas.getContext('2d');
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const r = 55;
    
    const lineColor = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)';
    const textColor = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)';
    const fillColor = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)';
    const strokeColor = isDark ? '#fff' : '#000';
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const labels = ['満腹', '温かさ', '刺激', '安心', '社交'];
    const keys = ['satiety', 'warmth', 'stimulation', 'comfort', 'social'];
    const n = 5;
    const step = (Math.PI * 2) / n;
    
    const normalized = keys.map(k => Math.max(0, Math.min(100, ((scores[k] + 6) / 12) * 100)));
    
    // 背景
    for (let i = 1; i <= 3; i++) {
        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        for (let j = 0; j <= n; j++) {
            const a = j * step - Math.PI / 2;
            const x = cx + (r / 3) * i * Math.cos(a);
            const y = cy + (r / 3) * i * Math.sin(a);
            j === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
    }
    
    // データ
    ctx.beginPath();
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 1.5;
    
    for (let i = 0; i < n; i++) {
        const a = i * step - Math.PI / 2;
        const pr = (normalized[i] / 100) * r;
        const x = cx + pr * Math.cos(a);
        const y = cy + pr * Math.sin(a);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // ラベル
    ctx.fillStyle = textColor;
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    for (let i = 0; i < n; i++) {
        const a = i * step - Math.PI / 2;
        let labelR = r + 22;
        let x = cx + labelR * Math.cos(a);
        let y = cy + labelR * Math.sin(a);
        
        ctx.fillText(labels[i], x, y);
    }
}

function showResult() {
    playResult();
    const result = calculateResult();
    lastScores = { ...totalScores };
    resultFood = result.first;

    document.getElementById('result-food').textContent = result.first.name;

    showScreen('result');
    setTimeout(() => drawRadarChart(lastScores), 50);
}

const SITE_URL = 'https://wahteat.netlify.app/';

function getShareText() {
    return `今日食べるものは「${resultFood.name}」だったよ！\n\n今日食べたいもの、悩んでない？\nそんな時はこれ使ってみて\n`;
}

function shareX() {
    const text = encodeURIComponent(getShareText());
    const url = encodeURIComponent(SITE_URL);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
}

function shareLINE() {
    const text = encodeURIComponent(getShareText() + '\n' + SITE_URL);
    window.open(`https://line.me/R/msg/text/?${text}`, '_blank');
}

function copyResult() {
    navigator.clipboard.writeText(getShareText() + '\n' + SITE_URL).then(() => {
        const btn = document.getElementById('copy-result');
        btn.textContent = 'OK!';
        btn.classList.add('copied');
        setTimeout(() => {
            btn.textContent = 'Copy';
            btn.classList.remove('copied');
        }, 1500);
    });
}

function reset() {
    currentQuestion = 0;
    answers = [];
    totalScores = { satiety: 0, warmth: 0, stimulation: 0, comfort: 0, social: 0 };
    lastScores = null;
    resultFood = null;
    showScreen('start');
}

// イベント
document.getElementById('start-btn').addEventListener('click', () => {
    startAudio();
    playSelect();
    showScreen('question');
    showQuestion(0);
});
document.getElementById('back-btn').addEventListener('click', goBack);
document.getElementById('retry-btn').addEventListener('click', () => {
    playSelect();
    reset();
});
document.getElementById('share-x').addEventListener('click', shareX);
document.getElementById('share-line').addEventListener('click', shareLINE);
document.getElementById('copy-result').addEventListener('click', copyResult);
