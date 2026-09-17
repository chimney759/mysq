// 即将到账订单页的独立模板。
window.PendingOrdersPageTemplate = `
  <div class="pending-orders-page-content">
    <header class="pending-orders-header">
      <button class="pending-orders-back" type="button" aria-label="返回我的页面"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg></button>
      <h1>我的订单</h1>
      <button class="pending-orders-help" type="button" aria-label="联系客服"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 13v-1a7.5 7.5 0 0 1 15 0v1"/><path d="M4.5 13a2 2 0 0 0 2 2h1.5v-5H6.5a2 2 0 0 0-2 2ZM19.5 13a2 2 0 0 1-2 2H16v-5h1.5a2 2 0 0 1 2 2Z"/><path d="M16 18c-.9.8-2.2 1.2-4 1.2"/></svg></button>
    </header>
    <nav class="pending-orders-tabs" aria-label="返现订单分类">
      <button class="active" type="button" data-order-filter="all">全部</button>
      <button type="button" data-order-filter="pending">即将到账</button>
      <button type="button" data-order-filter="recent">最近到账</button>
      <button type="button" data-order-filter="refund">维权/退款</button>
    </nav>
    <div class="pending-orders-notice">
      <span class="pending-orders-notice-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="14" height="17" rx="2"/><path d="M8 8h6M8 12h4M16 16l3 3M18.5 14.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z"/></svg></span>
      <strong>已经下单，没有找到订单?</strong>
      <button type="button">找回订单</button>
    </div>
    <main class="pending-orders-list">
      <article class="pending-order-card" data-order-status="recent">
        <div class="pending-order-meta"><span class="pending-order-platform platform-yellow">淘</span><span>下单时间：2026.08.05 23:10</span><b>已返现</b></div>
        <div class="pending-order-body"><div class="pending-order-image"><img src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&amp;fit=crop&amp;w=500&amp;q=80" alt="玲珑炒热火鸡架商品图"></div><div class="pending-order-copy"><strong>玲珑炒热火鸡架,玲珑特色炒泡面,需要餐具请...</strong><em>已返现 ￥0.76</em></div></div>
      </article>
      <article class="pending-order-card" data-order-status="pending">
        <div class="pending-order-meta"><span class="pending-order-platform platform-red">京</span><span>下单时间：2026.07.25 15:38</span><b>待返现</b></div>
        <div class="pending-order-body"><div class="pending-order-image"><img src="https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&amp;fit=crop&amp;w=500&amp;q=80" alt="304不锈钢水龙头商品图"></div><div class="pending-order-copy"><strong>德国机械臂 304 不锈钢万向水龙头延伸器防...</strong><em>预计返现 ￥0.90</em><small>2026-08-11到账</small></div></div>
      </article>
      <article class="pending-order-card" data-order-status="pending">
        <div class="pending-order-meta"><span class="pending-order-platform platform-orange">猫</span><span>下单时间：2026.07.18 16:22</span><b>待返现</b></div>
        <div class="pending-order-body"><div class="pending-order-image"><img src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&amp;fit=crop&amp;w=500&amp;q=80" alt="316不锈钢保温壶商品图"></div><div class="pending-order-copy"><strong>恩尔美（nRMEi）保温壶大容量家用 316 不锈...</strong><em>预计返现 ￥1.83</em><small>2026-08-06到账</small></div></div>
      </article>
      <p class="pending-orders-empty" hidden>无维权/退款订单</p>
    </main>
  </div>
`;
