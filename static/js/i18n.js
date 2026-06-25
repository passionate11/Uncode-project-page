/* ============================================================
   UNCODE — bilingual (EN / 中文) dictionary + language switch
   Keys map to [data-i18n] attributes in index.html.
   Values are innerHTML; LaTeX backslashes are escaped (\\).
   ============================================================ */
(function () {
  'use strict';

  var I18N = {
    /* ---- nav ---- */
    'nav.takeaways': { en: 'Takeaways',  zh: '核心要点' },
    'nav.highlights':{ en: 'Highlights', zh: '研究亮点' },
    'nav.biases':    { en: 'Biases',     zh: '解码偏差' },
    'nav.method':    { en: 'Method',     zh: '方法' },
    'nav.trajectory':{ en: 'Trajectory', zh: '轨迹重塑' },
    'nav.results':   { en: 'Results',    zh: '实验结果' },
    'nav.poster':    { en: 'Poster',     zh: '海报' },
    'skip':          { en: 'Skip to content', zh: '跳到正文' },

    /* ---- hero ---- */
    'hero.venue': { en: 'ACL&nbsp;2026 &nbsp;·&nbsp; Main Conference', zh: 'ACL&nbsp;2026 &nbsp;·&nbsp; 主会论文' },
    'hero.title': {
      en: 'Empirical Analysis of Decoding Biases<br/>in Masked Diffusion Models',
      zh: '掩码扩散模型中<br/>解码偏差的实证分析'
    },
    'hero.subtitle': {
      en: '<strong class="uncode">Uncode</strong> — <span class="nowrap">UN</span>masking <span class="nowrap">C</span>alibration for Dec<span class="nowrap">O</span>ding <span class="nowrap">DE</span>biasing: a <em>training-free</em> fix for two decoding biases that hold masked diffusion LLMs back.',
      zh: '<strong class="uncode">Uncode</strong> —— 面向解码去偏的去掩码校准（<span class="nowrap">UN</span>masking <span class="nowrap">C</span>alibration for Dec<span class="nowrap">O</span>ding <span class="nowrap">DE</span>biasing）：一种<em>免训练</em>方法，修正拖累掩码扩散大模型的两种解码偏差。'
    },
    'affil.1': { en: 'Northeastern University, China', zh: '东北大学（中国）' },
    'affil.2': { en: 'NLP Lab, Tsinghua University',   zh: '清华大学自然语言处理实验室' },
    'affil.3': { en: 'Alibaba Group',                  zh: '阿里巴巴集团' },
    'hero.corr': { en: 'Corresponding author', zh: '通讯作者' },
    'btn.code':   { en: 'Code',   zh: '代码' },
    'btn.poster': { en: 'Poster', zh: '海报' },

    /* ---- takeaways ---- */
    'takeaways.h': { en: 'Takeaways', zh: '核心要点' },
    'takeaways.1': {
      en: '<strong>Two biases, one root cause.</strong> Greedy uncertainty-based decoding systematically prefers boundaries and trivial tokens — both stem from "easy" positions being unmasked first.',
      zh: '<strong>两种偏差，同一根源。</strong> 基于不确定性的贪心解码会系统性地偏好边界与平凡词元 —— 二者都源于“容易”的位置被优先解掩。'
    },
    'takeaways.2': {
      en: '<strong>Calibrate, don\'t retrain.</strong> A position prior and a semantics prior, multiplied onto the existing score, are enough to fix it — no fine-tuning, no architecture change.',
      zh: '<strong>校准，而非重训。</strong> 只需在原有打分上乘以一个位置先验和一个语义先验即可修正 —— 无需微调，无需改动架构。'
    },
    'takeaways.3': {
      en: '<strong>Closing the gap to autoregressive.</strong> Decoding-side changes alone bring an 8B MDM to near-parity with a strong 7B autoregressive model on reasoning and planning.',
      zh: '<strong>逼近自回归模型。</strong> 仅靠解码端的改动，就能让 8B 的掩码扩散模型在推理与规划上接近强劲的 7B 自回归模型。'
    },
    'takeaways.4': {
      en: '<strong>Compatible with efficient decoding.</strong> <span class="uncode">Uncode</span> plugs into existing efficient decoding strategies (fast samplers), preserving their 2&times;&ndash;4&times; speedups while improving accuracy.',
      zh: '<strong>兼容高效解码。</strong> <span class="uncode">Uncode</span> 可接入现有的高效解码策略（快速采样器），在提升准确率的同时保留其 2&times;&ndash;4&times; 加速。'
    },

    /* ---- highlights ---- */
    'highlights.h': { en: 'Highlights', zh: '研究亮点' },
    'stat.1': { en: 'average gain over the strongest decoding baseline', zh: '相比最强解码基线的平均提升' },
    'stat.2': { en: 'LLaDA-1.5&nbsp;+&nbsp;<span class="uncode">Uncode</span> vs. Qwen-2.5-7B (autoregressive)', zh: 'LLaDA-1.5&nbsp;+&nbsp;<span class="uncode">Uncode</span> 对比 Qwen-2.5-7B（自回归）' },
    'stat.3': { en: 'MDM backbones &times; reasoning &amp; planning benchmarks', zh: '掩码扩散主干 &times; 推理与规划基准' },
    'stat.4': { en: 'extra training — plug-and-play, decoding-side only', zh: '额外训练 —— 即插即用，仅作用于解码端' },

    /* ---- biases ---- */
    'biases.h': { en: 'The Two Decoding Biases', zh: '两种解码偏差' },
    'biases.lead': {
      en: 'MDMs decode by iterative unmasking — any-order, multi-token, non-autoregressive. The <strong>unmasking order is decisive</strong>, and standard MDMs greedily unmask the least-uncertain positions first. That greedy heuristic creates two systematic biases.',
      zh: '掩码扩散模型通过迭代解掩进行解码 —— 任意顺序、多词元、非自回归。<strong>解掩顺序至关重要</strong>，而标准掩码扩散模型会贪心地优先解掩最确定的位置。这一贪心启发式带来了两种系统性偏差。'
    },
    'biases.teaser': {
      en: '<strong>The problem in one picture.</strong> Uncertainty-based decoders greedily unmask (A)&nbsp;<span class="hl-rose">boundary tokens</span> and (B)&nbsp;<span class="hl-amber">trivial tokens</span> first, fixing the answer before the rationale exists. (C)&nbsp;The ideal trajectory establishes the reasoning chain, then resolves the answer.',
      zh: '<strong>一图看懂问题。</strong> 基于不确定性的解码器会贪心地优先解掩 (A)&nbsp;<span class="hl-rose">边界词元</span> 和 (B)&nbsp;<span class="hl-amber">平凡词元</span>，在推理过程尚未形成时就锁定了答案。(C)&nbsp;理想的轨迹应先建立推理链，再确定答案。'
    },
    'bias1.tag': { en: 'Bias #1', zh: '偏差 #1' },
    'bias1.h':   { en: 'Rigid Boundary Bias', zh: '刚性边界偏差' },
    'bias1.p': {
      en: 'Boundary tokens (BOS/EOS and sentence edges) are <strong>consistently decoded first</strong> — a positional regularity learned during training — so decoding collapses inward along a fixed &ldquo;U-shaped&rdquo; trajectory. The model thus <strong>commits to an answer before the reasoning is built</strong>, with the order fixed by position rather than the task.',
      zh: '边界词元（BOS/EOS 与句子边缘）<strong>总是被最先解码</strong> —— 这是训练中习得的位置规律 —— 于是解码沿固定的“U 形”轨迹向内坍缩。模型因此<strong>在推理尚未构建之前就锁定答案</strong>，解码顺序由位置而非任务决定。'
    },
    'bias1.cap': {
      en: 'A characteristic U-shaped unmasking pattern; its rigidity helps planning (Sudoku) but hurts step-by-step reasoning (GSM8K).',
      zh: '典型的 U 形解掩模式；其刚性有利于规划（数独），却损害逐步推理（GSM8K）。'
    },
    'bias2.tag': { en: 'Bias #2', zh: '偏差 #2' },
    'bias2.h':   { en: 'Trivial Token Bias', zh: '平凡词元偏差' },
    'bias2.p': {
      en: 'High-frequency, low-information tokens (punctuation, spaces, fillers) are easy to predict, so they receive low uncertainty and get <strong>over-prioritized</strong> — nearly <strong>40%</strong> of selections vs. ~20% for autoregressive models. Decoding budget is spent on surface structure instead of reasoning content, and <strong>suppressing these trivial tokens monotonically improves accuracy</strong>.',
      zh: '高频、低信息量的词元（标点、空格、填充词）易于预测，因而获得低不确定性并被<strong>过度优先</strong> —— 占选择比例近 <strong>40%</strong>，而自回归模型约为 20%。解码预算被花在表层结构而非推理内容上；<strong>抑制这些平凡词元可单调提升准确率</strong>。'
    },
    'bias2.cap': {
      en: 'Trivial tokens are consistently over-selected; suppressing them monotonically improves GSM8K accuracy.',
      zh: '平凡词元被持续过度选择；抑制它们可单调提升 GSM8K 准确率。'
    },

    /* ---- method ---- */
    'method.h': { en: '<span class="uncode">Uncode</span>: Unmasking Calibration', zh: '<span class="uncode">Uncode</span>：去掩码校准' },
    'method.lead': {
      en: 'A lightweight, <strong>training-free</strong> recalibration of the unmasking priority $s^{\\,i}_t$ for every masked position $i$ at step $t$, multiplying the raw uncertainty score by two complementary priors:',
      zh: '一种轻量、<strong>免训练</strong>的重校准方法：对第 $t$ 步每个掩码位置 $i$ 的解掩优先级 $s^{\\,i}_t$，在原始不确定性打分上乘以两个互补的先验：'
    },
    'prior1.h': { en: 'Positional Trajectory Prior', zh: '位置轨迹先验' },
    'prior1.p': {
      en: 'Breaks the rigid boundary-first pattern with a position-dependent decay. The coefficient $\\lambda$ interpolates between <strong>flexible any-order</strong> decoding ($\\lambda\\!\\to\\!0$) and <strong>left-to-right</strong> generation (larger $\\lambda$), giving explicit control over causal dependency per task — in practice $\\lambda\\!=\\!0$ for Sudoku, $0.25$ for most tasks, and $0.5$ for Countdown.',
      zh: '用一个依赖位置的衰减打破“边界优先”的刚性模式。系数 $\\lambda$ 在<strong>灵活任意顺序</strong>解码（$\\lambda\\!\\to\\!0$）与<strong>从左到右</strong>生成（较大的 $\\lambda$）之间插值，从而对每个任务的因果依赖给予显式控制 —— 实践中数独取 $\\lambda\\!=\\!0$，多数任务取 $0.25$，Countdown 取 $0.5$。'
    },
    'prior2.h': { en: 'Semantic Informativeness Prior', zh: '语义信息量先验' },
    'prior2.p': {
      en: 'Down-weights frequent, low-information tokens via corpus-level <strong>self-information</strong> (estimated on a 16&nbsp;GB C4 subset), redirecting decoding toward content-bearing tokens. Clipping at $\\alpha$ (set to $10$) keeps rare tokens from dominating.',
      zh: '通过语料级<strong>自信息</strong>（在 16&nbsp;GB C4 子集上估计）对高频、低信息量词元降权，将解码导向承载内容的词元。在 $\\alpha$ 处截断（设为 $10$）以防稀有词元主导。'
    },
    'method.result': {
      en: 'The result: <span class="uncode">Uncode</span> keeps the parallel, any-order strengths of MDMs while <strong>globally reshaping the decoding trajectory</strong> and <strong>promoting informative content</strong> — with no retraining and negligible overhead.',
      zh: '结果：<span class="uncode">Uncode</span> 在保留掩码扩散模型并行、任意顺序优势的同时，<strong>全局重塑解码轨迹</strong>并<strong>提升信息性内容的优先级</strong> —— 无需重训，开销可忽略。'
    },

    /* ---- trajectory ---- */
    'traj.h': { en: 'Trajectory Reshaping', zh: '轨迹重塑' },
    'traj.lead': {
      en: 'The clearest evidence of what <span class="uncode">Uncode</span> does: it turns the baseline\'s rigid <strong>U-shaped</strong> unmasking pattern into a clean, content-first <strong>diagonal</strong> trajectory.',
      zh: '<span class="uncode">Uncode</span> 作用的最直接证据：它把基线刚性的 <strong>U 形</strong>解掩模式，变成干净、内容优先的<strong>对角线</strong>轨迹。'
    },
    'traj.cap1': {
      en: 'Unmasking probability over decoding steps. <strong>Left:</strong> the Confidence baseline collapses from both boundaries inward (U-shape). <strong>Right:</strong> <span class="uncode">Uncode</span> produces a smooth, progressive trajectory that builds global context before committing to the answer.',
      zh: '解码步上的解掩概率。<strong>左：</strong> Confidence 基线从两端边界向内坍缩（U 形）。<strong>右：</strong> <span class="uncode">Uncode</span> 产生平滑、渐进的轨迹，先建立全局上下文，再确定答案。'
    },
    'traj.cap2': {
      en: '<strong>Why it helps.</strong> The baseline guesses answer tokens early, while still uncertain (left, blue cluster). <span class="uncode">Uncode</span> <strong>defers answer tokens to later, high-confidence steps</strong> (red) and <strong>reduces global uncertainty faster</strong> (right) — reasoning first, answering second.',
      zh: '<strong>为何有效。</strong> 基线在仍不确定时就过早猜测答案词元（左，蓝色簇）。<span class="uncode">Uncode</span> <strong>将答案词元推迟到更晚、更高置信的步骤</strong>（红），并<strong>更快地降低全局不确定性</strong>（右）—— 先推理，后作答。'
    },

    /* ---- results ---- */
    'results.h': { en: 'Experimental Results', zh: '实验结果' },
    'results.lead': {
      en: 'Three MDM backbones (LLaDA-8B-Instruct, LLaDA-1.5-8B, and Dream-7B), seven benchmarks spanning code, math, science and planning, against eight decoding baselines and autoregressive references. The table below shows the two LLaDA backbones; full Dream-7B results are reported in the paper.',
      zh: '三个掩码扩散主干（LLaDA-8B-Instruct、LLaDA-1.5-8B、Dream-7B），覆盖代码、数学、科学与规划的七个基准，对比八种解码基线与自回归参考。下表给出两个 LLaDA 主干；完整的 Dream-7B 结果见论文。'
    },
    'results.sub1': { en: 'Main results — <span class="uncode">Uncode</span> is near-best across the board', zh: '主结果 —— <span class="uncode">Uncode</span> 几乎全面领先' },
    'results.sub2': { en: 'Ablation — both priors matter', zh: '消融实验 —— 两个先验缺一不可' },
    'results.sub3': { en: 'Plug-and-play with efficient samplers', zh: '与高效采样器即插即用' },
    'th.method':  { en: 'Method',  zh: '方法' },
    'th.sampler': { en: 'Sampler', zh: '采样器' },
    'th.avg':     { en: 'Avg.',    zh: '均值' },
    'th.speedup': { en: 'Speedup', zh: '加速比' },
    'grp.ar':     { en: 'Autoregressive LLMs', zh: '自回归大模型' },
    'ref.tag':    { en: 'reference', zh: '参考' },
    'tnote.1': {
      en: 'Pass@1 for code, accuracy elsewhere. <span class="chip best-chip">Bold</span> = best within each model group; <span class="chip uncode-chip">shaded</span> rows are <span class="uncode">Uncode</span>. <span class="uncode">Uncode</span> wins nearly every column on both MDM backbones, and LLaDA-1.5&nbsp;+&nbsp;<span class="uncode">Uncode</span> (44.7) is comparable to the much-tuned autoregressive Qwen-2.5-7B (45.3).',
      zh: '代码任务为 Pass@1，其余为准确率。<span class="chip best-chip">加粗</span> = 每个模型组内最佳；<span class="chip uncode-chip">阴影</span>行为 <span class="uncode">Uncode</span>。<span class="uncode">Uncode</span> 在两个掩码扩散主干上几乎赢得每一列，且 LLaDA-1.5&nbsp;+&nbsp;<span class="uncode">Uncode</span>（44.7）可与经过大量调优的自回归 Qwen-2.5-7B（45.3）相媲美。'
    },
    'ablation.cap': {
      en: 'Removing the <strong>positional trajectory prior</strong> causes the largest drop (42.7&nbsp;&rarr;&nbsp;34.9 and 44.7&nbsp;&rarr;&nbsp;35.5); the <strong>semantic informativeness prior</strong> adds a further +2.3 / +2.7. Both are necessary.',
      zh: '移除<strong>位置轨迹先验</strong>导致最大下降（42.7&nbsp;&rarr;&nbsp;34.9 与 44.7&nbsp;&rarr;&nbsp;35.5）；<strong>语义信息量先验</strong>再贡献 +2.3 / +2.7。两者缺一不可。'
    },
    'plug.lead': {
      en: '<span class="uncode">Uncode</span> is an unmasking <em>policy</em>, so it drops into existing fast decoders — improving quality by over <strong>3%</strong> on average while preserving their <strong>2&times;–4&times;</strong> speedups.',
      zh: '<span class="uncode">Uncode</span> 是一种解掩<em>策略</em>，因此可直接接入现有的快速解码器 —— 在保留其 <strong>2&times;–4&times;</strong> 加速的同时，平均提升质量超过 <strong>3%</strong>。'
    },
    'tnote.2': { en: 'Results on LLaDA-8B-Instruct. Speedup is relative to vanilla full-step decoding.', zh: '结果基于 LLaDA-8B-Instruct。加速比相对于原始全步解码。' },

    /* ---- poster ---- */
    'poster.h': { en: 'ACL 2026 Poster', zh: 'ACL 2026 海报' },
    'poster.cap': {
      en: 'Click to zoom, or <a href="static/pdf/uncode_poster.pdf" target="_blank" rel="noopener">open the full-resolution PDF&nbsp;&rarr;</a>',
      zh: '点击放大，或 <a href="static/pdf/uncode_poster.pdf" target="_blank" rel="noopener">打开高清 PDF&nbsp;&rarr;</a>'
    },

    /* ---- footer ---- */
    'foot.contact': { en: 'Contact', zh: '联系' },
    'foot.meta': {
      en: 'Northeastern University · NLP Lab, Tsinghua University · Alibaba Group<br/>Correspondence: <a href="mailto:pengcheng.neu@outlook.com">pengcheng.neu@outlook.com</a>',
      zh: '东北大学 · 清华大学自然语言处理实验室 · 阿里巴巴集团<br/>通讯：<a href="mailto:pengcheng.neu@outlook.com">pengcheng.neu@outlook.com</a>'
    },
    'foot.fine': {
      en: 'Project page for "Empirical Analysis of Decoding Biases in Masked Diffusion Models" (ACL 2026).',
      zh: '《掩码扩散模型中解码偏差的实证分析》（ACL 2026）项目主页。'
    },

    /* ---- dynamic (used by main.js) ---- */
    'copy':      { en: 'Copy', zh: '复制' },
    'copy.done': { en: 'Copied!', zh: '已复制！' }
  };

  // expose dictionary + a tiny lookup helper for main.js (copy button)
  window.UNCODE_I18N = I18N;
  window.uncodeLang = function () { return document.documentElement.getAttribute('data-lang') || 'en'; };
  window.uncodeT = function (key) {
    var e = I18N[key]; if (!e) return '';
    return e[window.uncodeLang()] != null ? e[window.uncodeLang()] : e.en;
  };

  var LS_KEY = 'uncode-lang';

  function reTypesetMath() {
    if (window.MathJax && MathJax.typesetPromise) {
      if (MathJax.typesetClear) { try { MathJax.typesetClear(); } catch (e) {} }
      MathJax.typesetPromise().catch(function () {});
    }
  }

  function applyLang(lang) {
    lang = (lang === 'zh') ? 'zh' : 'en';
    document.documentElement.setAttribute('data-lang', lang);
    document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-CN' : 'en');

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      var entry = I18N[k];
      if (entry && entry[lang] != null) el.innerHTML = entry[lang];
    });

    // toggle button shows the OTHER language as its target
    var btn = document.getElementById('langToggle');
    if (btn) {
      btn.textContent = lang === 'zh' ? 'EN' : '中文';
      btn.setAttribute('aria-label', lang === 'zh' ? 'Switch to English' : '切换到中文');
    }

    // refresh the copy button label if main.js exposed a hook
    if (window.uncodeRefreshCopyLabel) window.uncodeRefreshCopyLabel();

    reTypesetMath();
    try { localStorage.setItem(LS_KEY, lang); } catch (e) {}
  }

  function initialLang() {
    var saved;
    try { saved = localStorage.getItem(LS_KEY); } catch (e) {}
    if (saved === 'zh' || saved === 'en') return saved;
    // first visit: follow the browser, default to English otherwise
    var nav = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
    return nav.indexOf('zh') === 0 ? 'zh' : 'en';
  }

  window.uncodeSetLang = applyLang;

  function boot() {
    var btn = document.getElementById('langToggle');
    if (btn) {
      btn.addEventListener('click', function () {
        applyLang(window.uncodeLang() === 'zh' ? 'en' : 'zh');
      });
    }
    applyLang(initialLang());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
