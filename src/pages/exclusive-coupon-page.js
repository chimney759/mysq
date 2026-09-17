// 专属优惠券页的独立模板，由入口脚本挂载到 #page-exclusive-coupon。
window.ExclusiveCouponPageTemplate = `
  <div class="exclusive-coupon-page-content">
    <header class="exclusive-coupon-hero">
      <button class="exclusive-coupon-back" type="button" aria-label="返回我的页面"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg></button>
      <label class="exclusive-coupon-search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m16.5 16.5 4 4"/></svg><input type="search" placeholder="搜商品领优惠" aria-label="搜索商品领优惠"></label>
      <p>使用专属优惠券，淘宝购物的时候直接抵现金～</p>
    </header>
    <nav class="exclusive-coupon-tabs" aria-label="优惠状态"><button class="active" type="button"><strong>未使用</strong></button><button type="button"><strong>全部优惠</strong></button></nav>
    <section class="exclusive-coupon-empty" aria-label="优惠券空状态"><div class="exclusive-coupon-empty-art" aria-hidden="true"><span></span><b>···</b></div><p>最近未领取专属优惠券</p></section>
    <section class="exclusive-coupon-feed" aria-label="大家都在领"><h2>大家都在领</h2>
      <article class="exclusive-coupon-product"><div class="exclusive-coupon-product-image"><img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&amp;fit=crop&amp;w=500&amp;q=80" alt="休闲零食组合"></div><div class="exclusive-coupon-product-body"><strong><i>天猫</i> 乐事薯片400g零食组合解馋</strong><div class="exclusive-coupon-tags"><span>￥1.93元</span><em>补贴</em></div><del>￥29.9</del><div class="exclusive-coupon-product-action"><span>优惠后<br><b>￥23.47</b></span><button type="button">使用专属<br><b>优惠券</b></button></div></div></article>
      <article class="exclusive-coupon-product"><div class="exclusive-coupon-product-image"><img src="https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&amp;fit=crop&amp;w=500&amp;q=80" alt="Touchmark彩笔"></div><div class="exclusive-coupon-product-body"><strong><i class="taobao">淘宝</i> 泰驰 Touchmark 直液式丙烯马克笔软头小学生美术专用</strong><div class="exclusive-coupon-tags"><span>￥1.73元</span><em>10元券</em></div><del>￥24.9</del><div class="exclusive-coupon-product-action"><span>优惠后<br><b>￥13.17</b></span><button type="button">使用专属<br><b>优惠券</b></button></div></div></article>
      <article class="exclusive-coupon-product"><div class="exclusive-coupon-product-image"><img src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&amp;fit=crop&amp;w=500&amp;q=80" alt="益生菌商品"></div><div class="exclusive-coupon-product-body"><strong><i>天猫</i> 乐力2.2万亿小蓝条冻干粉益生菌</strong><div class="exclusive-coupon-tags"><span>￥2.68元</span><em>25元券</em></div><del>￥58.9</del><div class="exclusive-coupon-product-action"><span>优惠后<br><b>￥11.22</b></span><button type="button">使用专属<br><b>优惠券</b></button></div></div></article>
    </section>
  </div>
`;
