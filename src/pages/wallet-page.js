// 钱包详情页的独立模板，由入口脚本挂载到 #page-wallet。
window.WalletPageTemplate = `
  <div class="wallet-page-content">
    <header class="wallet-page-header">
      <button class="wallet-page-back" type="button" aria-label="返回我的页面"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg></button>
      <h1>钱包</h1>
      <button class="wallet-page-more" type="button" aria-label="更多"><span></span><span></span><span></span></button>
    </header>
    <nav class="wallet-balance-tabs" aria-label="钱包资产分类">
      <button class="active" type="button"><strong>现金</strong><span>￥131.79</span></button>
      <button type="button"><strong>金豆</strong><span>6540个</span></button>
      <button type="button"><strong>返现红包</strong><span>0张</span></button>
      <button type="button"><strong>专属优惠券</strong><span>0个</span></button>
    </nav>
    <main class="wallet-page-main">
      <button class="wallet-account-row" type="button">
        <span>收款账号</span>
        <span class="wallet-account-value"><b>支</b>138****7307<i aria-hidden="true"><svg viewBox="0 0 14 22" fill="none"><path d="m4.5 5.5 5.5 5.5-5.5 5.5"/></svg></i></span>
      </button>
      <section class="wallet-withdraw-card" aria-label="可提现余额">
        <h2>可提现余额(元): <strong>131.79</strong></h2>
        <div class="wallet-withdraw-form">
          <label><span>￥</span><input type="text" inputmode="decimal" placeholder="请输入提现金额" aria-label="请输入提现金额"></label>
          <button type="button">提现</button>
        </div>
      </section>
      <section class="wallet-processing-card" aria-label="一笔提现处理中">
        <h2>一笔提现处理中</h2>
        <dl>
          <div><dt>创建时间</dt><dd>2026-04-12 01:56:29</dd></div>
          <div><dt>提现金额</dt><dd>1.00元</dd></div>
          <div><dt>提现渠道</dt><dd>支付宝</dd></div>
          <div><dt>提现账户</dt><dd>138****7307 <button type="button">详情<span aria-hidden="true"><svg viewBox="0 0 14 22" fill="none"><path d="m4.5 5.5 5.5 5.5-5.5 5.5"/></svg></span></button></dd></div>
        </dl>
      </section>
      <section class="wallet-change-card" aria-label="余额变动">
        <header><strong>余额变动</strong><button type="button">全部<span aria-hidden="true"><svg viewBox="0 0 14 22" fill="none"><path d="m4.5 5.5 5.5 5.5-5.5 5.5"/></svg></span></button></header>
        <div class="wallet-change-row"><div><strong>提现到支付宝</strong><small>2026-04-12 02:23:05</small></div><div><b>- ￥1.00</b><small>30s到账</small></div></div>
        <div class="wallet-change-row"><div><strong>提现到支付宝</strong><small>2026-04-12 02:23:05</small></div><div><b>- ￥1.00</b><small>25s到账</small></div></div>
        <div class="wallet-change-row"><div><strong>返现订单 (NIKE男鞋Air...)</strong><small>2026-04-12 08:23:05</small></div><div><b class="positive">+ ￥4.68</b><small>含补贴0.35元</small></div></div>
      </section>
    </main>
  </div>
`;
