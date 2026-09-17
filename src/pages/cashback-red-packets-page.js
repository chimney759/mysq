// 返现红包页的独立模板，由入口脚本挂载到 #page-cashback-red-packets。
window.CashbackRedPacketsPageTemplate = `
  <div class="cashback-red-packets-page-content">
    <header class="cashback-red-packets-header">
      <button class="cashback-red-packets-back" type="button" aria-label="返回我的页面"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg></button>
      <h1>我的返现红包</h1>
      <button class="cashback-red-packets-rules" type="button">规则</button>
    </header>
    <nav class="cashback-red-packets-tabs" aria-label="返现红包状态">
      <button type="button"><strong>待使用</strong><span>￥0.00</span></button>
      <button class="active" type="button"><strong>已使用</strong><span>￥2.62</span></button>
    </nav>
    <main class="cashback-red-packets-list">
      <article class="cashback-red-packet-card cashback-red-packet-used">
        <div class="cashback-red-packet-main"><span class="cashback-red-packet-icon" aria-hidden="true"><b>返</b></span><div class="cashback-red-packet-copy"><strong>618返现红包</strong><small>已到账至返现余额</small></div><b class="cashback-red-packet-amount">￥0.36</b></div>
        <div class="cashback-red-packet-footer"><button type="button">使用规则<svg viewBox="0 0 14 8" fill="none" aria-hidden="true"><path d="m2 2 5 4 5-4"/></svg></button><button type="button">查看订单</button></div>
      </article>
      <article class="cashback-red-packet-card cashback-red-packet-used">
        <div class="cashback-red-packet-main"><span class="cashback-red-packet-icon" aria-hidden="true"><b>返</b></span><div class="cashback-red-packet-copy"><strong>618返现红包</strong><small>已到账至返现余额</small></div><b class="cashback-red-packet-amount">￥0.40</b></div>
        <div class="cashback-red-packet-footer"><button type="button">使用规则<svg viewBox="0 0 14 8" fill="none" aria-hidden="true"><path d="m2 2 5 4 5-4"/></svg></button><button type="button">查看订单</button></div>
      </article>
      <article class="cashback-red-packet-card cashback-red-packet-used">
        <div class="cashback-red-packet-main"><span class="cashback-red-packet-icon" aria-hidden="true"><b>返</b></span><div class="cashback-red-packet-copy"><strong>618返现红包</strong><small>已到账至返现余额</small></div><b class="cashback-red-packet-amount">￥0.36</b></div>
        <div class="cashback-red-packet-footer"><button type="button">使用规则<svg viewBox="0 0 14 8" fill="none" aria-hidden="true"><path d="m2 2 5 4 5-4"/></svg></button><button type="button">查看订单</button></div>
      </article>
      <article class="cashback-red-packet-card cashback-red-packet-used">
        <div class="cashback-red-packet-main"><span class="cashback-red-packet-icon" aria-hidden="true"><b>返</b></span><div class="cashback-red-packet-copy"><strong>上上签活动红包</strong><small>已到账至返现余额</small></div><b class="cashback-red-packet-amount">￥0.50</b></div>
        <div class="cashback-red-packet-footer"><button type="button">使用规则<svg viewBox="0 0 14 8" fill="none" aria-hidden="true"><path d="m2 2 5 4 5-4"/></svg></button><button type="button">查看订单</button></div>
      </article>
    </main>
  </div>
`;
