(function initializeGlobalHeaderActions() {
  const supportedPageClasses = ['home-active', 'mall-active'];
  const template = `
    <div class="global-header-actions" aria-label="全局快捷入口">
      <button class="global-header-action" type="button" aria-label="订单">
        <span class="global-header-action-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M8 7h8M8 11h8M8 15h5"/><path d="m8 18 1.5 1.5L12 17"/></svg><b class="global-order-badge" aria-label="3笔订单">3</b></span>
        <small>订单</small>
      </button>
      <button class="global-header-action" type="button" aria-label="消息">
        <span class="global-header-action-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg><b class="global-message-badge" aria-label="有未读消息"></b></span>
        <small>消息</small>
      </button>
    </div>`;

  function sync() {
    const isSupportedPage = supportedPageClasses.some(className => document.body.classList.contains(className));
    const current = document.querySelector('.global-header-actions');
    if (!isSupportedPage) {
      current?.remove();
      return;
    }
    if (!current) document.querySelector('.status-bar')?.insertAdjacentHTML('afterend', template);
  }

  new MutationObserver(sync).observe(document.body, {attributes:true, attributeFilter:['class']});
  document.addEventListener('click', function(event) {
    const orderButton = event.target.closest('.global-header-action[aria-label="订单"]');
    if (orderButton) document.dispatchEvent(new CustomEvent('app:open-pending-orders', {detail:{filter:'all'}}));
  });
  sync();
})();
