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
// 質問データ（図形ベース）
// ============================================

const questions = [
    {
        hint: "直感で選んで",
        options: [
            { 
                svg: `<svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="25" stroke-width="2"/></svg>`,
                scores: { energy: 0, fresh: -1, warm: 1, social: 1, comfort: 2, spicy: -1, rich: 1 }
            },
            { 
                svg: `<svg viewBox="0 0 60 60"><polygon points="30,5 55,55 5,55" stroke-width="2"/></svg>`,
                scores: { energy: 1, fresh: 1, warm: -1, social: 0, comfort: -1, spicy: 2, rich: -1 }
            },
            { 
                svg: `<svg viewBox="0 0 60 60"><rect x="8" y="8" width="44" height="44" stroke-width="2"/></svg>`,
                scores: { energy: 0, fresh: 0, warm: 0, social: 0, comfort: 1, spicy: 0, rich: 0 }
            },
            { 
                svg: `<svg viewBox="0 0 60 60"><path d="M5,30 Q20,10 30,30 T55,30" stroke-width="2"/></svg>`,
                scores: { energy: 1, fresh: 2, warm: -1, social: 0, comfort: 0, spicy: 0, rich: -1 }
            }
        ]
    },
    {
        hint: "直感で選んで",
        options: [
            { 
                svg: `<svg viewBox="0 0 60 60"><line x1="15" y1="5" x2="15" y2="55" stroke-width="2"/><line x1="30" y1="5" x2="30" y2="55" stroke-width="2"/><line x1="45" y1="5" x2="45" y2="55" stroke-width="2"/></svg>`,
                scores: { energy: 1, fresh: 1, warm: -1, social: -1, comfort: 0, spicy: 0, rich: -1 }
            },
            { 
                svg: `<svg viewBox="0 0 60 60"><line x1="5" y1="15" x2="55" y2="15" stroke-width="2"/><line x1="5" y1="30" x2="55" y2="30" stroke-width="2"/><line x1="5" y1="45" x2="55" y2="45" stroke-width="2"/></svg>`,
                scores: { energy: -1, fresh: 0, warm: 1, social: 0, comfort: 1, spicy: -1, rich: 1 }
            },
            { 
                svg: `<svg viewBox="0 0 60 60"><circle cx="15" cy="15" r="3" class="filled"/><circle cx="30" cy="15" r="3" class="filled"/><circle cx="45" cy="15" r="3" class="filled"/><circle cx="15" cy="30" r="3" class="filled"/><circle cx="30" cy="30" r="3" class="filled"/><circle cx="45" cy="30" r="3" class="filled"/><circle cx="15" cy="45" r="3" class="filled"/><circle cx="30" cy="45" r="3" class="filled"/><circle cx="45" cy="45" r="3" class="filled"/></svg>`,
                scores: { energy: 0, fresh: 0, warm: 0, social: 1, comfort: 1, spicy: 0, rich: 0 }
            },
            { 
                svg: `<svg viewBox="0 0 60 60"><path d="M30,5 Q55,20 45,35 Q35,50 30,55 Q25,50 15,35 Q5,20 30,5" stroke-width="2"/></svg>`,
                scores: { energy: -1, fresh: -1, warm: 2, social: 0, comfort: 2, spicy: 1, rich: 2 }
            }
        ]
    },
    {
        hint: "直感で選んで",
        options: [
            { 
                svg: `<svg viewBox="0 0 60 60"><line x1="10" y1="30" x2="50" y2="30" stroke-width="6"/></svg>`,
                scores: { energy: -2, fresh: -1, warm: 1, social: 0, comfort: 1, spicy: 0, rich: 2 }
            },
            { 
                svg: `<svg viewBox="0 0 60 60"><line x1="10" y1="30" x2="50" y2="30" stroke-width="1"/></svg>`,
                scores: { energy: 1, fresh: 2, warm: -1, social: 0, comfort: -1, spicy: 0, rich: -2 }
            },
            { 
                svg: `<svg viewBox="0 0 60 60"><path d="M10,40 Q25,10 40,40 Q50,55 55,30" stroke-width="2"/></svg>`,
                scores: { energy: 0, fresh: 0, warm: 1, social: 1, comfort: 1, spicy: 1, rich: 0 }
            },
            { 
                svg: `<svg viewBox="0 0 60 60"><line x1="10" y1="50" x2="50" y2="10" stroke-width="2"/></svg>`,
                scores: { energy: 1, fresh: 1, warm: -1, social: 0, comfort: -1, spicy: 1, rich: -1 }
            }
        ]
    },
    {
        hint: "直感で選んで",
        options: [
            { 
                svg: `<svg viewBox="0 0 60 60"><circle cx="25" cy="25" r="4" class="filled"/><circle cx="35" cy="25" r="4" class="filled"/><circle cx="25" cy="35" r="4" class="filled"/><circle cx="35" cy="35" r="4" class="filled"/><circle cx="30" cy="30" r="4" class="filled"/></svg>`,
                scores: { energy: -1, fresh: -1, warm: 2, social: 2, comfort: 1, spicy: 0, rich: 1 }
            },
            { 
                svg: `<svg viewBox="0 0 60 60"><circle cx="10" cy="15" r="3" class="filled"/><circle cx="50" cy="45" r="3" class="filled"/><circle cx="25" cy="50" r="3" class="filled"/><circle cx="45" cy="12" r="3" class="filled"/></svg>`,
                scores: { energy: 1, fresh: 1, warm: -1, social: -2, comfort: 0, spicy: 1, rich: -1 }
            },
            { 
                svg: `<svg viewBox="0 0 60 60"><circle cx="15" cy="30" r="4" class="filled"/><circle cx="30" cy="30" r="4" class="filled"/><circle cx="45" cy="30" r="4" class="filled"/></svg>`,
                scores: { energy: 0, fresh: 0, warm: 0, social: 0, comfort: 2, spicy: -1, rich: 0 }
            },
            { 
                svg: `<svg viewBox="0 0 60 60"><circle cx="12" cy="20" r="3" class="filled"/><circle cx="28" cy="12" r="3" class="filled"/><circle cx="48" cy="25" r="3" class="filled"/><circle cx="20" cy="42" r="3" class="filled"/><circle cx="40" cy="48" r="3" class="filled"/><circle cx="35" cy="32" r="3" class="filled"/></svg>`,
                scores: { energy: 1, fresh: 0, warm: 0, social: 1, comfort: -1, spicy: 2, rich: 0 }
            }
        ]
    },
    {
        hint: "直感で選んで",
        options: [
            { 
                svg: `<svg viewBox="0 0 60 60"><line x1="30" y1="50" x2="30" y2="15" stroke-width="2"/><polyline points="20,25 30,12 40,25" stroke-width="2"/></svg>`,
                scores: { energy: 2, fresh: 1, warm: -1, social: 1, comfort: -1, spicy: 1, rich: -1 }
            },
            { 
                svg: `<svg viewBox="0 0 60 60"><line x1="30" y1="10" x2="30" y2="45" stroke-width="2"/><polyline points="20,35 30,48 40,35" stroke-width="2"/></svg>`,
                scores: { energy: -2, fresh: -1, warm: 2, social: 0, comfort: 2, spicy: -1, rich: 2 }
            },
            { 
                svg: `<svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="18" stroke-width="2"/><path d="M30,12 L34,20 L30,18 L26,20 Z" class="filled"/></svg>`,
                scores: { energy: 0, fresh: 0, warm: 0, social: 2, comfort: 0, spicy: 0, rich: 0 }
            },
            { 
                svg: `<svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="8" class="filled"/></svg>`,
                scores: { energy: -1, fresh: 0, warm: 1, social: -1, comfort: 2, spicy: -1, rich: 1 }
            }
        ]
    },
    {
        hint: "直感で選んで",
        options: [
            {
                svg: `<svg viewBox="0 0 60 60"><rect x="10" y="10" width="40" height="40" stroke-width="2" class="filled"/></svg>`,
                scores: { energy: -2, fresh: -2, warm: 2, social: 0, comfort: 2, spicy: 0, rich: 2 }
            },
            {
                svg: `<svg viewBox="0 0 60 60"><rect x="10" y="10" width="40" height="40" stroke-width="2"/><circle cx="30" cy="30" r="4" stroke-width="2"/></svg>`,
                scores: { energy: 2, fresh: 2, warm: -1, social: 0, comfort: -1, spicy: 0, rich: -2 }
            },
            {
                svg: `<svg viewBox="0 0 60 60"><rect x="10" y="10" width="40" height="40" stroke-width="2"/><rect x="10" y="30" width="40" height="20" class="filled"/></svg>`,
                scores: { energy: 0, fresh: 0, warm: 0, social: 0, comfort: 1, spicy: 0, rich: 0 }
            },
            {
                svg: `<svg viewBox="0 0 60 60"><rect x="10" y="10" width="40" height="40" stroke-width="2"/><line x1="10" y1="42" x2="50" y2="42" stroke-width="6"/><line x1="10" y1="34" x2="50" y2="34" stroke-width="4"/><line x1="10" y1="26" x2="50" y2="26" stroke-width="2"/><line x1="10" y1="18" x2="50" y2="18" stroke-width="1"/></svg>`,
                scores: { energy: 0, fresh: 1, warm: 1, social: 1, comfort: 0, spicy: 1, rich: 0 }
            }
        ]
    }
];

// ============================================
// 食べ物データベース（350種類）
// ============================================

const foods = [
    // ===== ラーメン系 (20種類) =====
    { name: "味噌ラーメン", profile: { energy: -2, fresh: -2, warm: 2, social: 0, comfort: 2, spicy: 0, rich: 2 } },
    { name: "醤油ラーメン", profile: { energy: -1, fresh: -1, warm: 2, social: 0, comfort: 2, spicy: 0, rich: 1 } },
    { name: "塩ラーメン", profile: { energy: -1, fresh: 0, warm: 2, social: 0, comfort: 1, spicy: 0, rich: 0 } },
    { name: "豚骨ラーメン", profile: { energy: -2, fresh: -2, warm: 2, social: 0, comfort: 2, spicy: 0, rich: 2 } },
    { name: "味噌バターラーメン", profile: { energy: -2, fresh: -2, warm: 2, social: 0, comfort: 2, spicy: 0, rich: 2 } },
    { name: "バターコーンラーメン", profile: { energy: -1, fresh: -1, warm: 2, social: 0, comfort: 2, spicy: 0, rich: 2 } },
    { name: "チャーシューメン", profile: { energy: -2, fresh: -2, warm: 2, social: 0, comfort: 1, spicy: 0, rich: 2 } },
    { name: "ネギラーメン", profile: { energy: -1, fresh: 0, warm: 2, social: 0, comfort: 1, spicy: 0, rich: 1 } },
    { name: "野菜ラーメン", profile: { energy: 0, fresh: 0, warm: 2, social: 0, comfort: 1, spicy: 0, rich: 0 } },
    { name: "担々麺", profile: { energy: -1, fresh: -1, warm: 2, social: 0, comfort: 1, spicy: 2, rich: 1 } },
    { name: "つけ麺", profile: { energy: -1, fresh: 0, warm: 1, social: 0, comfort: 1, spicy: 0, rich: 1 } },
    { name: "油そば", profile: { energy: -1, fresh: -1, warm: 0, social: 0, comfort: 0, spicy: 0, rich: 2 } },
    { name: "台湾ラーメン", profile: { energy: -1, fresh: -1, warm: 2, social: 0, comfort: 0, spicy: 2, rich: 1 } },
    { name: "辛味噌ラーメン", profile: { energy: -1, fresh: -1, warm: 2, social: 0, comfort: 1, spicy: 2, rich: 2 } },
    { name: "煮干しラーメン", profile: { energy: -1, fresh: 0, warm: 2, social: 0, comfort: 1, spicy: 0, rich: 1 } },
    { name: "鶏白湯ラーメン", profile: { energy: -1, fresh: -1, warm: 2, social: 0, comfort: 2, spicy: 0, rich: 2 } },
    { name: "ワンタンメン", profile: { energy: -1, fresh: 0, warm: 2, social: 0, comfort: 2, spicy: 0, rich: 1 } },
    { name: "タンメン", profile: { energy: 0, fresh: 0, warm: 2, social: 0, comfort: 1, spicy: 0, rich: 0 } },
    { name: "サンマーメン", profile: { energy: 0, fresh: 0, warm: 2, social: 0, comfort: 1, spicy: 0, rich: 1 } },
    { name: "ちゃんぽん", profile: { energy: -1, fresh: 0, warm: 2, social: 0, comfort: 1, spicy: 0, rich: 1 } },

    // ===== うどん系 (15種類) =====
    { name: "かけうどん", profile: { energy: 1, fresh: 1, warm: 2, social: -1, comfort: 2, spicy: -1, rich: -1 } },
    { name: "きつねうどん", profile: { energy: 0, fresh: 0, warm: 2, social: -1, comfort: 2, spicy: -1, rich: 0 } },
    { name: "たぬきうどん", profile: { energy: 0, fresh: 0, warm: 2, social: -1, comfort: 2, spicy: -1, rich: 0 } },
    { name: "肉うどん", profile: { energy: -1, fresh: -1, warm: 2, social: 0, comfort: 2, spicy: 0, rich: 1 } },
    { name: "天ぷらうどん", profile: { energy: -1, fresh: 0, warm: 2, social: 0, comfort: 2, spicy: 0, rich: 1 } },
    { name: "カレーうどん", profile: { energy: -1, fresh: -1, warm: 2, social: 0, comfort: 2, spicy: 1, rich: 1 } },
    { name: "釜揚げうどん", profile: { energy: 0, fresh: 0, warm: 2, social: -1, comfort: 2, spicy: -1, rich: 0 } },
    { name: "ざるうどん", profile: { energy: 1, fresh: 1, warm: -1, social: -1, comfort: 1, spicy: -1, rich: -1 } },
    { name: "鍋焼きうどん", profile: { energy: -1, fresh: -1, warm: 2, social: -1, comfort: 2, spicy: 0, rich: 1 } },
    { name: "月見うどん", profile: { energy: 0, fresh: 0, warm: 2, social: -1, comfort: 2, spicy: -1, rich: 0 } },
    { name: "わかめうどん", profile: { energy: 1, fresh: 1, warm: 2, social: -1, comfort: 1, spicy: -1, rich: -1 } },
    { name: "山菜うどん", profile: { energy: 1, fresh: 1, warm: 2, social: -1, comfort: 1, spicy: -1, rich: -1 } },
    { name: "かき揚げうどん", profile: { energy: -1, fresh: 0, warm: 2, social: 0, comfort: 2, spicy: 0, rich: 1 } },
    { name: "とろろうどん", profile: { energy: 0, fresh: 1, warm: 1, social: -1, comfort: 2, spicy: -1, rich: 0 } },
    { name: "明太うどん", profile: { energy: 0, fresh: 0, warm: 1, social: 0, comfort: 1, spicy: 1, rich: 1 } },

    // ===== そば系 (12種類) =====
    { name: "ざるそば", profile: { energy: 1, fresh: 2, warm: -1, social: -1, comfort: 1, spicy: -1, rich: -1 } },
    { name: "かけそば", profile: { energy: 1, fresh: 1, warm: 1, social: -1, comfort: 1, spicy: -1, rich: -1 } },
    { name: "天ぷらそば", profile: { energy: 0, fresh: 0, warm: 1, social: 0, comfort: 1, spicy: 0, rich: 1 } },
    { name: "とろろそば", profile: { energy: 0, fresh: 1, warm: 0, social: -1, comfort: 1, spicy: -1, rich: 0 } },
    { name: "月見そば", profile: { energy: 0, fresh: 0, warm: 1, social: -1, comfort: 1, spicy: -1, rich: 0 } },
    { name: "鴨南蛮そば", profile: { energy: -1, fresh: 0, warm: 2, social: 0, comfort: 1, spicy: 0, rich: 1 } },
    { name: "にしんそば", profile: { energy: 0, fresh: 0, warm: 1, social: -1, comfort: 1, spicy: -1, rich: 0 } },
    { name: "山菜そば", profile: { energy: 1, fresh: 1, warm: 1, social: -1, comfort: 1, spicy: -1, rich: -1 } },
    { name: "わかめそば", profile: { energy: 1, fresh: 1, warm: 1, social: -1, comfort: 1, spicy: -1, rich: -1 } },
    { name: "たぬきそば", profile: { energy: 0, fresh: 0, warm: 1, social: -1, comfort: 1, spicy: -1, rich: 0 } },
    { name: "きつねそば", profile: { energy: 0, fresh: 0, warm: 1, social: -1, comfort: 1, spicy: -1, rich: 0 } },
    { name: "おろしそば", profile: { energy: 1, fresh: 2, warm: -1, social: -1, comfort: 0, spicy: 0, rich: -1 } },

    // ===== カレー系 (15種類) =====
    { name: "ビーフカレー", profile: { energy: -1, fresh: -1, warm: 2, social: 0, comfort: 2, spicy: 1, rich: 2 } },
    { name: "チキンカレー", profile: { energy: -1, fresh: -1, warm: 2, social: 0, comfort: 2, spicy: 1, rich: 1 } },
    { name: "ポークカレー", profile: { energy: -1, fresh: -1, warm: 2, social: 0, comfort: 2, spicy: 1, rich: 1 } },
    { name: "カツカレー", profile: { energy: -2, fresh: -2, warm: 2, social: 0, comfort: 2, spicy: 1, rich: 2 } },
    { name: "エビカレー", profile: { energy: 0, fresh: 0, warm: 2, social: 0, comfort: 1, spicy: 1, rich: 1 } },
    { name: "野菜カレー", profile: { energy: 0, fresh: 0, warm: 2, social: 0, comfort: 1, spicy: 1, rich: 0 } },
    { name: "キーマカレー", profile: { energy: -1, fresh: -1, warm: 2, social: 0, comfort: 1, spicy: 2, rich: 1 } },
    { name: "ドライカレー", profile: { energy: -1, fresh: -1, warm: 1, social: 0, comfort: 1, spicy: 1, rich: 1 } },
    { name: "スープカレー", profile: { energy: 0, fresh: 0, warm: 2, social: 0, comfort: 1, spicy: 1, rich: 0 } },
    { name: "グリーンカレー", profile: { energy: 0, fresh: 0, warm: 2, social: 1, comfort: 0, spicy: 2, rich: 1 } },
    { name: "バターチキンカレー", profile: { energy: -1, fresh: -1, warm: 2, social: 1, comfort: 1, spicy: 1, rich: 2 } },
    { name: "シーフードカレー", profile: { energy: 0, fresh: 0, warm: 2, social: 1, comfort: 1, spicy: 1, rich: 1 } },
    { name: "ほうれん草カレー", profile: { energy: 0, fresh: 0, warm: 2, social: 0, comfort: 1, spicy: 1, rich: 1 } },
    { name: "豆カレー", profile: { energy: 0, fresh: 0, warm: 2, social: 0, comfort: 1, spicy: 1, rich: 0 } },
    { name: "チーズカレー", profile: { energy: -1, fresh: -1, warm: 2, social: 0, comfort: 2, spicy: 1, rich: 2 } },

    // ===== パスタ系 (20種類) =====
    { name: "カルボナーラ", profile: { energy: -1, fresh: -2, warm: 1, social: 1, comfort: 2, spicy: -1, rich: 2 } },
    { name: "ペペロンチーノ", profile: { energy: 1, fresh: 1, warm: 1, social: 0, comfort: 0, spicy: 1, rich: -1 } },
    { name: "ボンゴレビアンコ", profile: { energy: 0, fresh: 1, warm: 1, social: 1, comfort: 0, spicy: 0, rich: 0 } },
    { name: "ボンゴレロッソ", profile: { energy: 0, fresh: 0, warm: 1, social: 1, comfort: 0, spicy: 0, rich: 1 } },
    { name: "ミートソース", profile: { energy: -1, fresh: -1, warm: 1, social: 1, comfort: 2, spicy: 0, rich: 1 } },
    { name: "ナポリタン", profile: { energy: -1, fresh: -1, warm: 1, social: 1, comfort: 2, spicy: 0, rich: 1 } },
    { name: "たらこパスタ", profile: { energy: 0, fresh: 0, warm: 1, social: 0, comfort: 1, spicy: 0, rich: 1 } },
    { name: "明太子パスタ", profile: { energy: 0, fresh: 0, warm: 1, social: 0, comfort: 1, spicy: 1, rich: 1 } },
    { name: "和風きのこパスタ", profile: { energy: 0, fresh: 1, warm: 1, social: 0, comfort: 1, spicy: 0, rich: 0 } },
    { name: "ペスカトーレ", profile: { energy: 0, fresh: 1, warm: 1, social: 1, comfort: 0, spicy: 0, rich: 1 } },
    { name: "ボロネーゼ", profile: { energy: -1, fresh: -1, warm: 1, social: 1, comfort: 1, spicy: 0, rich: 2 } },
    { name: "アラビアータ", profile: { energy: 0, fresh: 0, warm: 1, social: 0, comfort: 0, spicy: 2, rich: 0 } },
    { name: "ジェノベーゼ", profile: { energy: 0, fresh: 1, warm: 1, social: 1, comfort: 0, spicy: 0, rich: 1 } },
    { name: "クリームパスタ", profile: { energy: -1, fresh: -1, warm: 1, social: 0, comfort: 2, spicy: -1, rich: 2 } },
    { name: "トマトパスタ", profile: { energy: 0, fresh: 0, warm: 1, social: 0, comfort: 1, spicy: 0, rich: 0 } },
    { name: "海老クリームパスタ", profile: { energy: -1, fresh: 0, warm: 1, social: 1, comfort: 1, spicy: 0, rich: 2 } },
    { name: "アマトリチャーナ", profile: { energy: -1, fresh: -1, warm: 1, social: 0, comfort: 1, spicy: 1, rich: 1 } },
    { name: "プッタネスカ", profile: { energy: 0, fresh: 0, warm: 1, social: 0, comfort: 0, spicy: 1, rich: 0 } },
    { name: "カチョエペペ", profile: { energy: 0, fresh: 0, warm: 1, social: 0, comfort: 1, spicy: 1, rich: 1 } },
    { name: "ラザニア", profile: { energy: -1, fresh: -2, warm: 2, social: 1, comfort: 2, spicy: 0, rich: 2 } },

    // ===== 丼もの (20種類) =====
    { name: "親子丼", profile: { energy: -1, fresh: -1, warm: 1, social: -1, comfort: 2, spicy: -1, rich: 1 } },
    { name: "カツ丼", profile: { energy: -2, fresh: -1, warm: 1, social: -1, comfort: 2, spicy: -1, rich: 2 } },
    { name: "牛丼", profile: { energy: -2, fresh: -1, warm: 1, social: -1, comfort: 1, spicy: 0, rich: 1 } },
    { name: "豚丼", profile: { energy: -2, fresh: -1, warm: 1, social: -1, comfort: 1, spicy: 0, rich: 1 } },
    { name: "天丼", profile: { energy: -1, fresh: 0, warm: 1, social: 0, comfort: 1, spicy: 0, rich: 1 } },
    { name: "海鮮丼", profile: { energy: 0, fresh: 2, warm: -1, social: 0, comfort: 0, spicy: 0, rich: 1 } },
    { name: "ネギトロ丼", profile: { energy: 0, fresh: 2, warm: -1, social: 0, comfort: 1, spicy: 0, rich: 1 } },
    { name: "うな丼", profile: { energy: -1, fresh: 0, warm: 1, social: 0, comfort: 1, spicy: 0, rich: 2 } },
    { name: "中華丼", profile: { energy: -1, fresh: -1, warm: 1, social: 0, comfort: 1, spicy: 0, rich: 1 } },
    { name: "麻婆丼", profile: { energy: -1, fresh: -1, warm: 2, social: 0, comfort: 1, spicy: 2, rich: 1 } },
    { name: "そぼろ丼", profile: { energy: 0, fresh: 0, warm: 1, social: -1, comfort: 2, spicy: 0, rich: 0 } },
    { name: "焼き鳥丼", profile: { energy: -1, fresh: -1, warm: 1, social: 0, comfort: 1, spicy: 0, rich: 1 } },
    { name: "ステーキ丼", profile: { energy: -2, fresh: -1, warm: 1, social: 0, comfort: 0, spicy: 0, rich: 2 } },
    { name: "ロコモコ丼", profile: { energy: -1, fresh: 0, warm: 1, social: 1, comfort: 1, spicy: 0, rich: 1 } },
    { name: "チャーシュー丼", profile: { energy: -1, fresh: -1, warm: 1, social: 0, comfort: 1, spicy: 0, rich: 2 } },
    { name: "サーモン丼", profile: { energy: 0, fresh: 2, warm: -1, social: 0, comfort: 1, spicy: 0, rich: 1 } },
    { name: "まぐろ丼", profile: { energy: 0, fresh: 2, warm: -1, social: 0, comfort: 0, spicy: 0, rich: 1 } },
    { name: "しらす丼", profile: { energy: 1, fresh: 2, warm: -1, social: 0, comfort: 1, spicy: 0, rich: 0 } },
    { name: "いくら丼", profile: { energy: 0, fresh: 2, warm: -1, social: 1, comfort: 0, spicy: 0, rich: 2 } },
    { name: "三色丼", profile: { energy: 0, fresh: 1, warm: 0, social: 0, comfort: 1, spicy: 0, rich: 1 } },

    // ===== 寿司系 (15種類) =====
    { name: "握り寿司", profile: { energy: 1, fresh: 2, warm: -1, social: 1, comfort: 0, spicy: 0, rich: 1 } },
    { name: "ちらし寿司", profile: { energy: 0, fresh: 2, warm: -1, social: 1, comfort: 1, spicy: 0, rich: 0 } },
    { name: "手巻き寿司", profile: { energy: 0, fresh: 2, warm: -1, social: 2, comfort: 1, spicy: 0, rich: 0 } },
    { name: "押し寿司", profile: { energy: 0, fresh: 1, warm: -1, social: 0, comfort: 1, spicy: 0, rich: 0 } },
    { name: "巻き寿司", profile: { energy: 0, fresh: 1, warm: -1, social: 1, comfort: 1, spicy: 0, rich: 0 } },
    { name: "いなり寿司", profile: { energy: 0, fresh: 0, warm: 0, social: 0, comfort: 2, spicy: -1, rich: 0 } },
    { name: "鉄火巻き", profile: { energy: 0, fresh: 2, warm: -1, social: 0, comfort: 0, spicy: 0, rich: 1 } },
    { name: "サーモン寿司", profile: { energy: 0, fresh: 2, warm: -1, social: 1, comfort: 1, spicy: 0, rich: 1 } },
    { name: "まぐろ寿司", profile: { energy: 0, fresh: 2, warm: -1, social: 1, comfort: 0, spicy: 0, rich: 1 } },
    { name: "えび寿司", profile: { energy: 0, fresh: 1, warm: -1, social: 1, comfort: 0, spicy: 0, rich: 0 } },
    { name: "いか寿司", profile: { energy: 0, fresh: 1, warm: -1, social: 0, comfort: 0, spicy: 0, rich: 0 } },
    { name: "たこ寿司", profile: { energy: 0, fresh: 1, warm: -1, social: 0, comfort: 0, spicy: 0, rich: 0 } },
    { name: "ネギトロ巻き", profile: { energy: 0, fresh: 2, warm: -1, social: 0, comfort: 1, spicy: 0, rich: 1 } },
    { name: "サラダ巻き", profile: { energy: 1, fresh: 1, warm: -1, social: 0, comfort: 1, spicy: 0, rich: 0 } },
    { name: "穴子寿司", profile: { energy: 0, fresh: 0, warm: 0, social: 0, comfort: 1, spicy: 0, rich: 1 } },

    // ===== 中華系 (25種類) =====
    { name: "餃子", profile: { energy: -1, fresh: -1, warm: 1, social: 2, comfort: 1, spicy: 0, rich: 1 } },
    { name: "焼き餃子", profile: { energy: -1, fresh: -1, warm: 1, social: 2, comfort: 1, spicy: 0, rich: 1 } },
    { name: "水餃子", profile: { energy: 0, fresh: 0, warm: 2, social: 1, comfort: 1, spicy: 0, rich: 0 } },
    { name: "麻婆豆腐", profile: { energy: -1, fresh: -1, warm: 2, social: 1, comfort: 1, spicy: 2, rich: 1 } },
    { name: "エビチリ", profile: { energy: 0, fresh: 0, warm: 1, social: 2, comfort: 0, spicy: 1, rich: 1 } },
    { name: "回鍋肉", profile: { energy: -1, fresh: -1, warm: 1, social: 1, comfort: 1, spicy: 1, rich: 1 } },
    { name: "青椒肉絲", profile: { energy: 0, fresh: 0, warm: 1, social: 1, comfort: 0, spicy: 0, rich: 0 } },
    { name: "酢豚", profile: { energy: 0, fresh: 0, warm: 1, social: 2, comfort: 1, spicy: 0, rich: 1 } },
    { name: "八宝菜", profile: { energy: 0, fresh: 0, warm: 1, social: 1, comfort: 1, spicy: 0, rich: 0 } },
    { name: "天津飯", profile: { energy: -1, fresh: -1, warm: 1, social: 0, comfort: 2, spicy: 0, rich: 1 } },
    { name: "チャーハン", profile: { energy: -1, fresh: -1, warm: 1, social: 0, comfort: 1, spicy: 0, rich: 1 } },
    { name: "あんかけチャーハン", profile: { energy: -1, fresh: -1, warm: 2, social: 0, comfort: 2, spicy: 0, rich: 1 } },
    { name: "キムチチャーハン", profile: { energy: -1, fresh: -1, warm: 1, social: 0, comfort: 1, spicy: 2, rich: 1 } },
    { name: "エビチャーハン", profile: { energy: -1, fresh: 0, warm: 1, social: 0, comfort: 1, spicy: 0, rich: 1 } },
    { name: "高菜チャーハン", profile: { energy: -1, fresh: 0, warm: 1, social: 0, comfort: 1, spicy: 0, rich: 0 } },
    { name: "春巻き", profile: { energy: 0, fresh: 0, warm: 1, social: 1, comfort: 0, spicy: 0, rich: 1 } },
    { name: "シュウマイ", profile: { energy: 0, fresh: 0, warm: 1, social: 1, comfort: 1, spicy: 0, rich: 1 } },
    { name: "小籠包", profile: { energy: 0, fresh: 0, warm: 2, social: 1, comfort: 1, spicy: 0, rich: 1 } },
    { name: "油淋鶏", profile: { energy: -1, fresh: 0, warm: 1, social: 1, comfort: 0, spicy: 0, rich: 1 } },
    { name: "棒棒鶏", profile: { energy: 0, fresh: 1, warm: -1, social: 1, comfort: 0, spicy: 1, rich: 0 } },
    { name: "エビマヨ", profile: { energy: 0, fresh: 0, warm: 0, social: 2, comfort: 1, spicy: 0, rich: 2 } },
    { name: "豚キムチ", profile: { energy: -1, fresh: -1, warm: 1, social: 1, comfort: 1, spicy: 2, rich: 1 } },
    { name: "レバニラ", profile: { energy: -1, fresh: -1, warm: 1, social: 0, comfort: 0, spicy: 0, rich: 1 } },
    { name: "焼きビーフン", profile: { energy: 0, fresh: 0, warm: 1, social: 0, comfort: 1, spicy: 0, rich: 0 } },
    { name: "皿うどん", profile: { energy: -1, fresh: 0, warm: 1, social: 0, comfort: 1, spicy: 0, rich: 1 } },

    // ===== 洋食系 (25種類) =====
    { name: "ハンバーグ", profile: { energy: -1, fresh: -1, warm: 1, social: 0, comfort: 2, spicy: 0, rich: 2 } },
    { name: "チーズハンバーグ", profile: { energy: -1, fresh: -2, warm: 1, social: 0, comfort: 2, spicy: 0, rich: 2 } },
    { name: "和風ハンバーグ", profile: { energy: -1, fresh: 0, warm: 1, social: 0, comfort: 2, spicy: 0, rich: 1 } },
    { name: "デミグラスハンバーグ", profile: { energy: -1, fresh: -1, warm: 1, social: 0, comfort: 2, spicy: 0, rich: 2 } },
    { name: "煮込みハンバーグ", profile: { energy: -1, fresh: -1, warm: 2, social: 0, comfort: 2, spicy: 0, rich: 2 } },
    { name: "おろしハンバーグ", profile: { energy: -1, fresh: 0, warm: 1, social: 0, comfort: 1, spicy: 0, rich: 1 } },
    { name: "ステーキ", profile: { energy: -2, fresh: -1, warm: 1, social: 1, comfort: 0, spicy: 0, rich: 2 } },
    { name: "サーロインステーキ", profile: { energy: -2, fresh: -1, warm: 1, social: 1, comfort: 0, spicy: 0, rich: 2 } },
    { name: "ヒレステーキ", profile: { energy: -1, fresh: 0, warm: 1, social: 1, comfort: 0, spicy: 0, rich: 1 } },
    { name: "オムライス", profile: { energy: -1, fresh: -1, warm: 1, social: 0, comfort: 2, spicy: 0, rich: 1 } },
    { name: "チキンオムライス", profile: { energy: -1, fresh: -1, warm: 1, social: 0, comfort: 2, spicy: 0, rich: 1 } },
    { name: "デミグラスオムライス", profile: { energy: -1, fresh: -1, warm: 1, social: 0, comfort: 2, spicy: 0, rich: 2 } },
    { name: "ふわとろオムライス", profile: { energy: -1, fresh: -1, warm: 1, social: 0, comfort: 2, spicy: 0, rich: 2 } },
    { name: "グラタン", profile: { energy: -1, fresh: -2, warm: 2, social: 0, comfort: 2, spicy: 0, rich: 2 } },
    { name: "マカロニグラタン", profile: { energy: -1, fresh: -2, warm: 2, social: 0, comfort: 2, spicy: 0, rich: 2 } },
    { name: "ドリア", profile: { energy: -1, fresh: -2, warm: 2, social: 0, comfort: 2, spicy: 0, rich: 2 } },
    { name: "シーフードドリア", profile: { energy: -1, fresh: -1, warm: 2, social: 0, comfort: 2, spicy: 0, rich: 2 } },
    { name: "ビーフシチュー", profile: { energy: -1, fresh: -1, warm: 2, social: 1, comfort: 2, spicy: 0, rich: 2 } },
    { name: "クリームシチュー", profile: { energy: -1, fresh: -1, warm: 2, social: 1, comfort: 2, spicy: -1, rich: 2 } },
    { name: "ハヤシライス", profile: { energy: -1, fresh: -1, warm: 1, social: 0, comfort: 2, spicy: 0, rich: 1 } },
    { name: "ポークソテー", profile: { energy: -1, fresh: -1, warm: 1, social: 0, comfort: 1, spicy: 0, rich: 1 } },
    { name: "チキンソテー", profile: { energy: -1, fresh: 0, warm: 1, social: 0, comfort: 1, spicy: 0, rich: 1 } },
    { name: "ローストビーフ", profile: { energy: -1, fresh: 0, warm: 0, social: 1, comfort: 0, spicy: 0, rich: 2 } },
    { name: "ローストチキン", profile: { energy: -1, fresh: 0, warm: 1, social: 2, comfort: 1, spicy: 0, rich: 1 } },
    { name: "オムレツ", profile: { energy: 0, fresh: 0, warm: 1, social: 0, comfort: 2, spicy: -1, rich: 1 } },

    // ===== 和食系 (30種類) =====
    { name: "焼き魚定食", profile: { energy: 0, fresh: 1, warm: 1, social: -1, comfort: 1, spicy: 0, rich: 0 } },
    { name: "鮭の塩焼き", profile: { energy: 0, fresh: 1, warm: 1, social: -1, comfort: 1, spicy: 0, rich: 1 } },
    { name: "さばの塩焼き", profile: { energy: 0, fresh: 0, warm: 1, social: -1, comfort: 1, spicy: 0, rich: 1 } },
    { name: "さんまの塩焼き", profile: { energy: 0, fresh: 0, warm: 1, social: -1, comfort: 1, spicy: 0, rich: 1 } },
    { name: "ぶりの照り焼き", profile: { energy: -1, fresh: 0, warm: 1, social: 0, comfort: 1, spicy: 0, rich: 1 } },
    { name: "さばの味噌煮", profile: { energy: -1, fresh: -1, warm: 1, social: -1, comfort: 2, spicy: 0, rich: 1 } },
    { name: "煮魚", profile: { energy: 0, fresh: 0, warm: 1, social: -1, comfort: 2, spicy: 0, rich: 1 } },
    { name: "刺身盛り合わせ", profile: { energy: 1, fresh: 2, warm: -1, social: 1, comfort: 0, spicy: 0, rich: 1 } },
    { name: "天ぷら", profile: { energy: 0, fresh: 0, warm: 1, social: 0, comfort: 1, spicy: 0, rich: 1 } },
    { name: "天ぷら盛り合わせ", profile: { energy: -1, fresh: 0, warm: 1, social: 1, comfort: 1, spicy: 0, rich: 1 } },
    { name: "とんかつ", profile: { energy: -2, fresh: -1, warm: 1, social: 0, comfort: 1, spicy: 0, rich: 2 } },
    { name: "ロースカツ", profile: { energy: -2, fresh: -1, warm: 1, social: 0, comfort: 1, spicy: 0, rich: 2 } },
    { name: "ヒレカツ", profile: { energy: -1, fresh: 0, warm: 1, social: 0, comfort: 1, spicy: 0, rich: 1 } },
    { name: "味噌カツ", profile: { energy: -2, fresh: -1, warm: 1, social: 0, comfort: 2, spicy: 0, rich: 2 } },
    { name: "チキンカツ", profile: { energy: -1, fresh: -1, warm: 1, social: 0, comfort: 1, spicy: 0, rich: 1 } },
    { name: "唐揚げ", profile: { energy: -1, fresh: -1, warm: 1, social: 1, comfort: 2, spicy: 0, rich: 1 } },
    { name: "塩唐揚げ", profile: { energy: -1, fresh: 0, warm: 1, social: 1, comfort: 1, spicy: 0, rich: 0 } },
    { name: "にんにく唐揚げ", profile: { energy: -1, fresh: -1, warm: 1, social: 1, comfort: 1, spicy: 0, rich: 1 } },
    { name: "竜田揚げ", profile: { energy: -1, fresh: -1, warm: 1, social: 0, comfort: 1, spicy: 0, rich: 1 } },
    { name: "チキン南蛮", profile: { energy: -1, fresh: 0, warm: 1, social: 0, comfort: 1, spicy: 0, rich: 1 } },
    { name: "生姜焼き", profile: { energy: -1, fresh: 0, warm: 1, social: 0, comfort: 1, spicy: 0, rich: 1 } },
    { name: "肉じゃが", profile: { energy: -1, fresh: -1, warm: 2, social: -1, comfort: 2, spicy: 0, rich: 1 } },
    { name: "筑前煮", profile: { energy: 0, fresh: 0, warm: 1, social: -1, comfort: 2, spicy: 0, rich: 0 } },
    { name: "おでん", profile: { energy: 0, fresh: 0, warm: 2, social: 0, comfort: 2, spicy: 0, rich: 0 } },
    { name: "茶碗蒸し", profile: { energy: 1, fresh: 0, warm: 1, social: 0, comfort: 2, spicy: -1, rich: 0 } },
    { name: "卵焼き", profile: { energy: 0, fresh: 0, warm: 1, social: 0, comfort: 2, spicy: -1, rich: 0 } },
    { name: "焼き鳥", profile: { energy: -1, fresh: 0, warm: 1, social: 2, comfort: 1, spicy: 0, rich: 1 } },
    { name: "豚汁", profile: { energy: 0, fresh: 0, warm: 2, social: -1, comfort: 2, spicy: 0, rich: 1 } },
    { name: "けんちん汁", profile: { energy: 0, fresh: 0, warm: 2, social: -1, comfort: 2, spicy: 0, rich: 0 } },
    { name: "味噌汁", profile: { energy: 1, fresh: 0, warm: 2, social: -1, comfort: 2, spicy: 0, rich: 0 } },

    // ===== 鍋系 (15種類) =====
    { name: "すき焼き", profile: { energy: -1, fresh: 0, warm: 2, social: 2, comfort: 2, spicy: 0, rich: 2 } },
    { name: "しゃぶしゃぶ", profile: { energy: 0, fresh: 1, warm: 2, social: 2, comfort: 1, spicy: 0, rich: 0 } },
    { name: "豚しゃぶ", profile: { energy: 0, fresh: 1, warm: 2, social: 2, comfort: 1, spicy: 0, rich: 1 } },
    { name: "牛しゃぶ", profile: { energy: -1, fresh: 1, warm: 2, social: 2, comfort: 1, spicy: 0, rich: 1 } },
    { name: "キムチ鍋", profile: { energy: -1, fresh: 0, warm: 2, social: 2, comfort: 1, spicy: 2, rich: 1 } },
    { name: "もつ鍋", profile: { energy: -1, fresh: -1, warm: 2, social: 2, comfort: 1, spicy: 1, rich: 1 } },
    { name: "水炊き", profile: { energy: 0, fresh: 1, warm: 2, social: 2, comfort: 2, spicy: -1, rich: 0 } },
    { name: "寄せ鍋", profile: { energy: 0, fresh: 0, warm: 2, social: 2, comfort: 2, spicy: 0, rich: 1 } },
    { name: "ちゃんこ鍋", profile: { energy: -1, fresh: -1, warm: 2, social: 2, comfort: 1, spicy: 0, rich: 1 } },
    { name: "豆乳鍋", profile: { energy: 0, fresh: 0, warm: 2, social: 1, comfort: 2, spicy: -1, rich: 1 } },
    { name: "トマト鍋", profile: { energy: 0, fresh: 0, warm: 2, social: 1, comfort: 1, spicy: 0, rich: 1 } },
    { name: "カレー鍋", profile: { energy: -1, fresh: -1, warm: 2, social: 2, comfort: 1, spicy: 1, rich: 1 } },
    { name: "味噌鍋", profile: { energy: -1, fresh: -1, warm: 2, social: 1, comfort: 2, spicy: 0, rich: 1 } },
    { name: "塩ちゃんこ", profile: { energy: 0, fresh: 0, warm: 2, social: 2, comfort: 1, spicy: 0, rich: 0 } },
    { name: "鶏鍋", profile: { energy: 0, fresh: 0, warm: 2, social: 2, comfort: 2, spicy: 0, rich: 0 } },

    // ===== 焼肉系 (15種類) =====
    { name: "カルビ", profile: { energy: -2, fresh: -1, warm: 1, social: 2, comfort: 0, spicy: 0, rich: 2 } },
    { name: "ロース", profile: { energy: -1, fresh: 0, warm: 1, social: 2, comfort: 0, spicy: 0, rich: 1 } },
    { name: "ハラミ", profile: { energy: -1, fresh: 0, warm: 1, social: 2, comfort: 0, spicy: 0, rich: 1 } },
    { name: "タン塩", profile: { energy: -1, fresh: 0, warm: 1, social: 2, comfort: 0, spicy: 0, rich: 0 } },
    { name: "ホルモン", profile: { energy: -1, fresh: -1, warm: 1, social: 2, comfort: 0, spicy: 0, rich: 1 } },
    { name: "豚トロ", profile: { energy: -1, fresh: -1, warm: 1, social: 2, comfort: 0, spicy: 0, rich: 2 } },
    { name: "鶏もも", profile: { energy: -1, fresh: 0, warm: 1, social: 2, comfort: 1, spicy: 0, rich: 1 } },
    { name: "手羽先", profile: { energy: -1, fresh: -1, warm: 1, social: 2, comfort: 1, spicy: 0, rich: 1 } },
    { name: "砂肝", profile: { energy: 0, fresh: 0, warm: 1, social: 2, comfort: 0, spicy: 0, rich: 0 } },
    { name: "レバー", profile: { energy: -1, fresh: -1, warm: 1, social: 1, comfort: 0, spicy: 0, rich: 1 } },
    { name: "ミノ", profile: { energy: 0, fresh: 0, warm: 1, social: 2, comfort: 0, spicy: 0, rich: 0 } },
    { name: "ハツ", profile: { energy: 0, fresh: 0, warm: 1, social: 2, comfort: 0, spicy: 0, rich: 0 } },
    { name: "ジンギスカン", profile: { energy: -1, fresh: 0, warm: 1, social: 2, comfort: 0, spicy: 0, rich: 1 } },
    { name: "サムギョプサル", profile: { energy: -1, fresh: 0, warm: 1, social: 2, comfort: 0, spicy: 1, rich: 1 } },
    { name: "プルコギ", profile: { energy: -1, fresh: 0, warm: 1, social: 2, comfort: 1, spicy: 0, rich: 1 } },

    // ===== ピザ系 (10種類) =====
    { name: "マルゲリータ", profile: { energy: 0, fresh: 0, warm: 1, social: 2, comfort: 1, spicy: 0, rich: 1 } },
    { name: "クワトロフォルマッジ", profile: { energy: 0, fresh: -1, warm: 1, social: 2, comfort: 1, spicy: 0, rich: 2 } },
    { name: "マリナーラ", profile: { energy: 1, fresh: 0, warm: 1, social: 1, comfort: 0, spicy: 0, rich: 0 } },
    { name: "ペパロニピザ", profile: { energy: -1, fresh: -1, warm: 1, social: 2, comfort: 1, spicy: 1, rich: 1 } },
    { name: "シーフードピザ", profile: { energy: 0, fresh: 0, warm: 1, social: 2, comfort: 0, spicy: 0, rich: 1 } },
    { name: "テリヤキチキンピザ", profile: { energy: -1, fresh: -1, warm: 1, social: 2, comfort: 1, spicy: 0, rich: 1 } },
    { name: "ベーコンピザ", profile: { energy: -1, fresh: -1, warm: 1, social: 2, comfort: 1, spicy: 0, rich: 1 } },
    { name: "野菜ピザ", profile: { energy: 0, fresh: 0, warm: 1, social: 2, comfort: 0, spicy: 0, rich: 0 } },
    { name: "ミックスピザ", profile: { energy: -1, fresh: -1, warm: 1, social: 2, comfort: 1, spicy: 0, rich: 1 } },
    { name: "ハワイアンピザ", profile: { energy: 0, fresh: 0, warm: 1, social: 2, comfort: 1, spicy: 0, rich: 0 } },

    // ===== 粉もの (10種類) =====
    { name: "お好み焼き", profile: { energy: -1, fresh: -1, warm: 2, social: 2, comfort: 1, spicy: 0, rich: 1 } },
    { name: "豚玉", profile: { energy: -1, fresh: -1, warm: 2, social: 2, comfort: 1, spicy: 0, rich: 1 } },
    { name: "イカ玉", profile: { energy: -1, fresh: 0, warm: 2, social: 2, comfort: 1, spicy: 0, rich: 0 } },
    { name: "ミックス焼き", profile: { energy: -1, fresh: -1, warm: 2, social: 2, comfort: 1, spicy: 0, rich: 1 } },
    { name: "広島焼き", profile: { energy: -1, fresh: -1, warm: 2, social: 2, comfort: 1, spicy: 0, rich: 1 } },
    { name: "たこ焼き", profile: { energy: 0, fresh: -1, warm: 2, social: 2, comfort: 1, spicy: 0, rich: 0 } },
    { name: "焼きそば", profile: { energy: -1, fresh: -1, warm: 1, social: 1, comfort: 1, spicy: 0, rich: 0 } },
    { name: "ソース焼きそば", profile: { energy: -1, fresh: -1, warm: 1, social: 1, comfort: 1, spicy: 0, rich: 0 } },
    { name: "塩焼きそば", profile: { energy: 0, fresh: 0, warm: 1, social: 1, comfort: 1, spicy: 0, rich: 0 } },
    { name: "もんじゃ焼き", profile: { energy: 0, fresh: -1, warm: 2, social: 2, comfort: 0, spicy: 0, rich: 0 } },

    // ===== エスニック系 (20種類) =====
    { name: "パッタイ", profile: { energy: 0, fresh: 0, warm: 1, social: 1, comfort: 0, spicy: 1, rich: 0 } },
    { name: "フォー", profile: { energy: 1, fresh: 1, warm: 1, social: 0, comfort: 0, spicy: 0, rich: -1 } },
    { name: "ガパオライス", profile: { energy: 0, fresh: 0, warm: 1, social: 0, comfort: 0, spicy: 2, rich: 0 } },
    { name: "トムヤムクン", profile: { energy: 1, fresh: 1, warm: 2, social: 1, comfort: 0, spicy: 2, rich: 0 } },
    { name: "生春巻き", profile: { energy: 1, fresh: 2, warm: -1, social: 1, comfort: 0, spicy: 0, rich: -1 } },
    { name: "ビビンバ", profile: { energy: 0, fresh: 0, warm: 1, social: 0, comfort: 0, spicy: 1, rich: 0 } },
    { name: "石焼ビビンバ", profile: { energy: -1, fresh: -1, warm: 2, social: 0, comfort: 1, spicy: 1, rich: 1 } },
    { name: "チヂミ", profile: { energy: 0, fresh: 0, warm: 1, social: 1, comfort: 0, spicy: 0, rich: 0 } },
    { name: "冷麺", profile: { energy: 1, fresh: 2, warm: -2, social: 0, comfort: 0, spicy: 0, rich: 0 } },
    { name: "タコス", profile: { energy: 0, fresh: 0, warm: 0, social: 2, comfort: 0, spicy: 1, rich: 0 } },
    { name: "ブリトー", profile: { energy: -1, fresh: -1, warm: 0, social: 1, comfort: 1, spicy: 1, rich: 1 } },
    { name: "ナシゴレン", profile: { energy: 0, fresh: 0, warm: 1, social: 0, comfort: 0, spicy: 1, rich: 0 } },
    { name: "ミーゴレン", profile: { energy: 0, fresh: 0, warm: 1, social: 0, comfort: 0, spicy: 1, rich: 0 } },
    { name: "カオマンガイ", profile: { energy: 0, fresh: 0, warm: 1, social: 0, comfort: 1, spicy: 0, rich: 0 } },
    { name: "ラクサ", profile: { energy: 0, fresh: 0, warm: 2, social: 0, comfort: 0, spicy: 1, rich: 1 } },
    { name: "バインミー", profile: { energy: 1, fresh: 1, warm: -1, social: 0, comfort: 0, spicy: 0, rich: 0 } },
    { name: "ケバブ", profile: { energy: -1, fresh: 0, warm: 0, social: 1, comfort: 0, spicy: 1, rich: 1 } },
    { name: "レッドカレー", profile: { energy: 0, fresh: 0, warm: 2, social: 0, comfort: 0, spicy: 2, rich: 1 } },
    { name: "マッサマンカレー", profile: { energy: -1, fresh: -1, warm: 2, social: 0, comfort: 1, spicy: 1, rich: 2 } },
    { name: "フォーガー", profile: { energy: 0, fresh: 1, warm: 2, social: 0, comfort: 1, spicy: 0, rich: 0 } },

    // ===== ハンバーガー系 (10種類) =====
    { name: "ハンバーガー", profile: { energy: -1, fresh: -1, warm: 0, social: 1, comfort: 1, spicy: 0, rich: 1 } },
    { name: "チーズバーガー", profile: { energy: -1, fresh: -1, warm: 0, social: 1, comfort: 1, spicy: 0, rich: 1 } },
    { name: "てりやきバーガー", profile: { energy: -1, fresh: -1, warm: 0, social: 1, comfort: 2, spicy: 0, rich: 1 } },
    { name: "フィッシュバーガー", profile: { energy: 0, fresh: 0, warm: 0, social: 0, comfort: 1, spicy: 0, rich: 0 } },
    { name: "チキンバーガー", profile: { energy: 0, fresh: 0, warm: 0, social: 0, comfort: 1, spicy: 0, rich: 0 } },
    { name: "アボカドバーガー", profile: { energy: 0, fresh: 0, warm: 0, social: 0, comfort: 1, spicy: 0, rich: 1 } },
    { name: "ベーコンバーガー", profile: { energy: -1, fresh: -1, warm: 0, social: 1, comfort: 1, spicy: 0, rich: 2 } },
    { name: "エッグバーガー", profile: { energy: -1, fresh: -1, warm: 0, social: 0, comfort: 1, spicy: 0, rich: 1 } },
    { name: "ダブルバーガー", profile: { energy: -2, fresh: -2, warm: 0, social: 1, comfort: 0, spicy: 0, rich: 2 } },
    { name: "和風バーガー", profile: { energy: -1, fresh: 0, warm: 0, social: 0, comfort: 1, spicy: 0, rich: 0 } },

    // ===== 揚げ物系 (15種類) =====
    { name: "フライドチキン", profile: { energy: -1, fresh: -1, warm: 1, social: 2, comfort: 1, spicy: 0, rich: 2 } },
    { name: "チキンナゲット", profile: { energy: 0, fresh: -1, warm: 0, social: 1, comfort: 1, spicy: 0, rich: 1 } },
    { name: "エビフライ", profile: { energy: 0, fresh: 0, warm: 1, social: 0, comfort: 1, spicy: 0, rich: 1 } },
    { name: "カキフライ", profile: { energy: 0, fresh: 0, warm: 1, social: 0, comfort: 1, spicy: 0, rich: 1 } },
    { name: "アジフライ", profile: { energy: 0, fresh: 0, warm: 1, social: -1, comfort: 1, spicy: 0, rich: 0 } },
    { name: "イカフライ", profile: { energy: 0, fresh: 0, warm: 1, social: 0, comfort: 1, spicy: 0, rich: 0 } },
    { name: "コロッケ", profile: { energy: -1, fresh: -1, warm: 1, social: 0, comfort: 2, spicy: 0, rich: 1 } },
    { name: "クリームコロッケ", profile: { energy: -1, fresh: -1, warm: 1, social: 0, comfort: 2, spicy: 0, rich: 2 } },
    { name: "メンチカツ", profile: { energy: -1, fresh: -1, warm: 1, social: 0, comfort: 1, spicy: 0, rich: 2 } },
    { name: "串カツ", profile: { energy: -1, fresh: -1, warm: 1, social: 2, comfort: 1, spicy: 0, rich: 1 } },
    { name: "ハムカツ", profile: { energy: 0, fresh: -1, warm: 1, social: 0, comfort: 1, spicy: 0, rich: 0 } },
    { name: "かき揚げ", profile: { energy: 0, fresh: 0, warm: 1, social: 0, comfort: 1, spicy: 0, rich: 1 } },
    { name: "野菜天ぷら", profile: { energy: 0, fresh: 0, warm: 1, social: 0, comfort: 1, spicy: 0, rich: 0 } },
    { name: "フライドポテト", profile: { energy: 0, fresh: -1, warm: 1, social: 1, comfort: 1, spicy: 0, rich: 1 } },
    { name: "オニオンリング", profile: { energy: 0, fresh: 0, warm: 1, social: 1, comfort: 1, spicy: 0, rich: 0 } },

    // ===== ご飯もの (15種類) =====
    { name: "卵かけご飯", profile: { energy: 1, fresh: 0, warm: 0, social: -2, comfort: 2, spicy: -1, rich: 0 } },
    { name: "お茶漬け", profile: { energy: 1, fresh: 1, warm: 1, social: -2, comfort: 2, spicy: -1, rich: -1 } },
    { name: "鮭茶漬け", profile: { energy: 1, fresh: 1, warm: 1, social: -2, comfort: 2, spicy: -1, rich: 0 } },
    { name: "梅茶漬け", profile: { energy: 1, fresh: 2, warm: 1, social: -2, comfort: 2, spicy: 0, rich: -1 } },
    { name: "雑炊", profile: { energy: 0, fresh: 0, warm: 2, social: -1, comfort: 2, spicy: -1, rich: 0 } },
    { name: "おかゆ", profile: { energy: 1, fresh: 0, warm: 2, social: -2, comfort: 2, spicy: -1, rich: -1 } },
    { name: "リゾット", profile: { energy: -1, fresh: -1, warm: 1, social: 0, comfort: 2, spicy: 0, rich: 2 } },
    { name: "チーズリゾット", profile: { energy: -1, fresh: -2, warm: 1, social: 0, comfort: 2, spicy: 0, rich: 2 } },
    { name: "トマトリゾット", profile: { energy: 0, fresh: 0, warm: 1, social: 0, comfort: 1, spicy: 0, rich: 1 } },
    { name: "ピラフ", profile: { energy: 0, fresh: 0, warm: 1, social: 0, comfort: 1, spicy: 0, rich: 0 } },
    { name: "エビピラフ", profile: { energy: 0, fresh: 0, warm: 1, social: 0, comfort: 1, spicy: 0, rich: 1 } },
    { name: "焼きおにぎり", profile: { energy: 0, fresh: 0, warm: 1, social: -1, comfort: 2, spicy: 0, rich: 0 } },
    { name: "炊き込みご飯", profile: { energy: 0, fresh: 0, warm: 1, social: 0, comfort: 2, spicy: 0, rich: 0 } },
    { name: "五目ご飯", profile: { energy: 0, fresh: 0, warm: 1, social: 0, comfort: 2, spicy: 0, rich: 0 } },
    { name: "赤飯", profile: { energy: 0, fresh: 0, warm: 1, social: 1, comfort: 1, spicy: 0, rich: 0 } },

    // ===== 軽食系 (20種類) =====
    { name: "サンドイッチ", profile: { energy: 1, fresh: 1, warm: -1, social: 0, comfort: 0, spicy: 0, rich: 0 } },
    { name: "カツサンド", profile: { energy: -1, fresh: -1, warm: 0, social: 0, comfort: 1, spicy: 0, rich: 1 } },
    { name: "卵サンド", profile: { energy: 0, fresh: 0, warm: -1, social: 0, comfort: 1, spicy: 0, rich: 0 } },
    { name: "ツナサンド", profile: { energy: 0, fresh: 0, warm: -1, social: 0, comfort: 1, spicy: 0, rich: 0 } },
    { name: "BLTサンド", profile: { energy: 0, fresh: 0, warm: -1, social: 0, comfort: 0, spicy: 0, rich: 1 } },
    { name: "おにぎり", profile: { energy: 1, fresh: 0, warm: 0, social: -1, comfort: 2, spicy: -1, rich: -1 } },
    { name: "鮭おにぎり", profile: { energy: 1, fresh: 0, warm: 0, social: -1, comfort: 2, spicy: -1, rich: 0 } },
    { name: "ツナマヨおにぎり", profile: { energy: 0, fresh: 0, warm: 0, social: -1, comfort: 1, spicy: 0, rich: 1 } },
    { name: "梅おにぎり", profile: { energy: 1, fresh: 1, warm: 0, social: -1, comfort: 2, spicy: 0, rich: -1 } },
    { name: "昆布おにぎり", profile: { energy: 0, fresh: 0, warm: 0, social: -1, comfort: 2, spicy: 0, rich: 0 } },
    { name: "トースト", profile: { energy: 1, fresh: 0, warm: 1, social: -1, comfort: 1, spicy: 0, rich: 0 } },
    { name: "フレンチトースト", profile: { energy: 0, fresh: 0, warm: 1, social: 0, comfort: 2, spicy: -1, rich: 1 } },
    { name: "ホットドッグ", profile: { energy: 0, fresh: 0, warm: 0, social: 1, comfort: 1, spicy: 0, rich: 0 } },
    { name: "クロワッサン", profile: { energy: 0, fresh: 0, warm: 0, social: 0, comfort: 1, spicy: 0, rich: 1 } },
    { name: "ベーグル", profile: { energy: 0, fresh: 0, warm: 0, social: 0, comfort: 0, spicy: 0, rich: 0 } },
    { name: "パニーニ", profile: { energy: 0, fresh: 0, warm: 1, social: 0, comfort: 0, spicy: 0, rich: 1 } },
    { name: "サラダ", profile: { energy: 2, fresh: 2, warm: -1, social: 0, comfort: -1, spicy: 0, rich: -2 } },
    { name: "シーザーサラダ", profile: { energy: 1, fresh: 2, warm: -1, social: 0, comfort: 0, spicy: 0, rich: 0 } },
    { name: "ポテトサラダ", profile: { energy: 0, fresh: 0, warm: -1, social: 0, comfort: 1, spicy: 0, rich: 1 } },
    { name: "マカロニサラダ", profile: { energy: 0, fresh: 0, warm: -1, social: 0, comfort: 1, spicy: 0, rich: 1 } },

    // ===== スープ系 (10種類) =====
    { name: "コーンスープ", profile: { energy: 0, fresh: 0, warm: 2, social: 0, comfort: 2, spicy: -1, rich: 1 } },
    { name: "ミネストローネ", profile: { energy: 0, fresh: 1, warm: 2, social: 0, comfort: 1, spicy: 0, rich: 0 } },
    { name: "クラムチャウダー", profile: { energy: 0, fresh: 0, warm: 2, social: 0, comfort: 2, spicy: 0, rich: 2 } },
    { name: "オニオンスープ", profile: { energy: 0, fresh: 0, warm: 2, social: 0, comfort: 2, spicy: 0, rich: 1 } },
    { name: "ポタージュ", profile: { energy: 0, fresh: 0, warm: 2, social: 0, comfort: 2, spicy: -1, rich: 1 } },
    { name: "トマトスープ", profile: { energy: 0, fresh: 0, warm: 2, social: 0, comfort: 1, spicy: 0, rich: 0 } },
    { name: "中華スープ", profile: { energy: 0, fresh: 0, warm: 2, social: 0, comfort: 1, spicy: 0, rich: 0 } },
    { name: "わかめスープ", profile: { energy: 1, fresh: 1, warm: 2, social: 0, comfort: 1, spicy: 0, rich: -1 } },
    { name: "卵スープ", profile: { energy: 0, fresh: 0, warm: 2, social: 0, comfort: 2, spicy: 0, rich: 0 } },
    { name: "野菜スープ", profile: { energy: 1, fresh: 1, warm: 2, social: 0, comfort: 1, spicy: 0, rich: 0 } },

    // ===== その他 (20種類) =====
    { name: "肉まん", profile: { energy: -1, fresh: -1, warm: 2, social: -1, comfort: 2, spicy: 0, rich: 1 } },
    { name: "あんまん", profile: { energy: 0, fresh: 0, warm: 2, social: -1, comfort: 2, spicy: -2, rich: 1 } },
    { name: "ピザまん", profile: { energy: 0, fresh: -1, warm: 2, social: -1, comfort: 1, spicy: 0, rich: 1 } },
    { name: "カレーまん", profile: { energy: 0, fresh: -1, warm: 2, social: -1, comfort: 1, spicy: 1, rich: 1 } },
    { name: "焼き芋", profile: { energy: 0, fresh: 0, warm: 2, social: -1, comfort: 2, spicy: -1, rich: 0 } },
    { name: "枝豆", profile: { energy: 1, fresh: 0, warm: 0, social: 2, comfort: 0, spicy: 0, rich: -1 } },
    { name: "冷奴", profile: { energy: 1, fresh: 1, warm: -1, social: 0, comfort: 1, spicy: 0, rich: -1 } },
    { name: "揚げ出し豆腐", profile: { energy: 0, fresh: 0, warm: 1, social: 0, comfort: 2, spicy: 0, rich: 0 } },
    { name: "焼きナス", profile: { energy: 0, fresh: 0, warm: 1, social: -1, comfort: 1, spicy: 0, rich: 0 } },
    { name: "ほうれん草のおひたし", profile: { energy: 1, fresh: 1, warm: -1, social: -1, comfort: 1, spicy: 0, rich: -1 } },
    { name: "きんぴらごぼう", profile: { energy: 0, fresh: 0, warm: 0, social: -1, comfort: 1, spicy: 0, rich: 0 } },
    { name: "春雨サラダ", profile: { energy: 1, fresh: 1, warm: -1, social: 0, comfort: 0, spicy: 0, rich: 0 } },
    { name: "ナムル", profile: { energy: 0, fresh: 0, warm: -1, social: 0, comfort: 0, spicy: 0, rich: 0 } },
    { name: "キムチ", profile: { energy: 0, fresh: 0, warm: -1, social: 0, comfort: 0, spicy: 2, rich: 0 } },
    { name: "パンケーキ", profile: { energy: 0, fresh: 0, warm: 1, social: 1, comfort: 2, spicy: -2, rich: 1 } },
    { name: "ワッフル", profile: { energy: 0, fresh: 0, warm: 1, social: 1, comfort: 1, spicy: -2, rich: 1 } },
    { name: "クレープ", profile: { energy: 1, fresh: 0, warm: -1, social: 1, comfort: 1, spicy: -2, rich: 1 } },
    { name: "アイスクリーム", profile: { energy: 1, fresh: 1, warm: -2, social: 0, comfort: 1, spicy: -2, rich: 1 } },
    { name: "かき氷", profile: { energy: 2, fresh: 2, warm: -2, social: 0, comfort: 0, spicy: -2, rich: -1 } },
    { name: "あんみつ", profile: { energy: 0, fresh: 0, warm: -1, social: 0, comfort: 2, spicy: -2, rich: 0 } }
];

// 状態管理
let currentQuestion = 0;
let answers = [];
let totalScores = { energy: 0, fresh: 0, warm: 0, social: 0, comfort: 0, spicy: 0, rich: 0 };
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
    if (hour >= 18 || hour <= 4) {
        totalScores.warm += 1;
        totalScores.comfort += 0.5;
        totalScores.rich += 0.5;
    } else if (hour >= 5 && hour <= 10) {
        totalScores.fresh += 0.5;
        totalScores.energy += 0.5;
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
    
    const labels = ['活力', 'さっぱり', '温かさ', '社交', '安心'];
    const keys = ['energy', 'fresh', 'warm', 'social', 'comfort'];
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
    const result = calculateResult();
    lastScores = { ...totalScores };
    resultFood = result.first;

    document.getElementById('result-food').textContent = result.first.name;

    showScreen('result');
    setTimeout(() => drawRadarChart(lastScores), 50);
}

function getShareText() {
    return `What Eat? の結果→「${resultFood.name}」\n`;
}

function shareX() {
    const text = encodeURIComponent(getShareText());
    const url = encodeURIComponent(location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
}

function shareLINE() {
    const text = encodeURIComponent(getShareText() + location.href);
    window.open(`https://line.me/R/msg/text/?${text}`, '_blank');
}

function copyResult() {
    navigator.clipboard.writeText(getShareText() + location.href).then(() => {
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
    totalScores = { energy: 0, fresh: 0, warm: 0, social: 0, comfort: 0, spicy: 0, rich: 0 };
    lastScores = null;
    resultFood = null;
    showScreen('start');
}

// イベント
document.getElementById('start-btn').addEventListener('click', () => {
    showScreen('question');
    showQuestion(0);
});
document.getElementById('back-btn').addEventListener('click', goBack);
document.getElementById('retry-btn').addEventListener('click', reset);
document.getElementById('share-x').addEventListener('click', shareX);
document.getElementById('share-line').addEventListener('click', shareLINE);
document.getElementById('copy-result').addEventListener('click', copyResult);
