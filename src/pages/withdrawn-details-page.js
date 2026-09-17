// 已提现入口对应的收支明细页模板。
window.WithdrawnDetailsPageTemplate = `
  <div class="withdrawn-details-page-content">
    <header class="withdrawn-details-header">
      <button class="withdrawn-details-back" type="button" aria-label="返回我的页面"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg></button>
      <h1>收支明细</h1>
      <span class="withdrawn-details-header-space" aria-hidden="true"></span>
    </header>
    <nav class="withdrawn-details-tabs" aria-label="收支明细类型">
      <button class="active" type="button">现金</button>
      <button type="button">金豆</button>
    </nav>
    <main class="withdrawn-details-list">
      <section class="withdrawn-details-month">
        <h2>本月</h2>
        <article class="withdrawn-detail-row withdrawn-detail-link">
          <div><strong>返现-乡村小炒肉,白米饭</strong><small>2026-8-2 00:13</small></div>
          <div><b>+ ￥0.19</b><span class="withdrawn-detail-arrow" aria-hidden="true"><svg viewBox="0 0 14 22" fill="none"><path d="m4.5 5.5 5.5 5.5-5.5 5.5"/></svg></span></div>
        </article>
      </section>
      <section class="withdrawn-details-month">
        <h2>2026年7月</h2>
        <article class="withdrawn-detail-row"><div><strong>抽现金红包</strong><small>2026-7-31 20:37</small></div><div><b>+ ￥0.06</b></div></article>
        <article class="withdrawn-detail-row"><div><strong>抽现金红包</strong><small>2026-7-31 20:37</small></div><div><b>+ ￥0.10</b></div></article>
        <article class="withdrawn-detail-row"><div><strong>抽现金红包</strong><small>2026-7-31 20:37</small></div><div><b>+ ￥0.13</b></div></article>
        <article class="withdrawn-detail-row"><div><strong>抽现金红包</strong><small>2026-7-31 20:37</small></div><div><b>+ ￥0.10</b></div></article>
        <article class="withdrawn-detail-row"><div><strong>抽现金红包</strong><small>2026-7-31 20:37</small></div><div><b>+ ￥0.04</b></div></article>
        <article class="withdrawn-detail-row withdrawn-detail-link"><div><strong>返现-氮气罐大小瓶飘空...</strong><small>2026-7-31 14:19</small></div><div><b>+ ￥1.41</b><span class="withdrawn-detail-arrow" aria-hidden="true"><svg viewBox="0 0 14 22" fill="none"><path d="m4.5 5.5 5.5 5.5-5.5 5.5"/></svg></span></div></article>
        <article class="withdrawn-detail-row withdrawn-detail-link"><div><strong>返现-黑胡椒传奇牛排套...</strong><small>2026-7-30 14:14</small></div><div><b>+ ￥0.71</b><span class="withdrawn-detail-arrow" aria-hidden="true"><svg viewBox="0 0 14 22" fill="none"><path d="m4.5 5.5 5.5 5.5-5.5 5.5"/></svg></span></div></article>
      </section>
    </main>
  </div>
`;
