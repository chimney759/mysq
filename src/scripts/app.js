// 底部导航切换
document.getElementById('bottomNav').addEventListener('click', function(e) {
  const tab = e.target.closest('.nav-tab');
  if (!tab) return;
  const pageId = tab.dataset.page;
  if (!pageId) return;
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  document.body.classList.toggle('life-active', pageId === 'page-life');
  document.body.classList.toggle('mall-active', pageId === 'page-haojia');
  document.body.classList.toggle('butie-active', pageId === 'page-butie');
  document.body.classList.toggle('mine-active', pageId === 'page-mine');
  document.body.classList.toggle('home-active', pageId === 'page-home');
  document.body.classList.remove('home-scroll-active');
  document.body.classList.remove('life-scroll-active');
  document.body.classList.remove('mall-scroll-active');
  document.querySelectorAll('body > .tab-page, body > div.tab-page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
  if (pageId === 'page-home') {
    const homeContent = document.querySelector('#page-home > .content');
    updateHomeHeader(homeContent ? homeContent.scrollTop : 0);
  }
  if (pageId === 'page-life') {
    const lifeContent = document.querySelector('#page-life > .content');
    updateLifeHeader(lifeContent ? lifeContent.scrollTop : window.scrollY);
  }
  if (pageId === 'page-haojia') {
    const mallContent = document.querySelector('#page-haojia > .content');
    updateMallHeader(mallContent ? mallContent.scrollTop : window.scrollY);
  }
});

// 首页上滑时收起已省信息，并将搜索框放入顶部左侧；回到顶部后恢复。
function updateHomeHeader(scrollTop) {
  const isHome = document.querySelector('.nav-tab.active')?.dataset.page === 'page-home';
  // 完整越过原始顶部区域后才切换固定态，回到页面顶部立即恢复，避免临界位置出现叠层。
  const topShellHeight = 30 + 47 + 60;
  document.body.classList.toggle('home-scroll-active', isHome && scrollTop >= topShellHeight);
}

window.addEventListener('scroll', function() {
  updateLifeHeader(window.scrollY);
  updateMallHeader(window.scrollY);
}, {passive:true});

const lifeContent = document.querySelector('#page-life > .content');

function updateLifeHeader(scrollTop) {
  const isLife = document.querySelector('.nav-tab.active')?.dataset.page === 'page-life';
  document.body.classList.toggle('life-scroll-active', isLife && scrollTop > 8);
}

if (lifeContent) {
  lifeContent.addEventListener('scroll', function() {
    updateLifeHeader(this.scrollTop);
  }, {passive:true});
}

const mallContent = document.querySelector('#page-haojia > .content');

function updateMallHeader(scrollTop) {
  const isMall = document.querySelector('.nav-tab.active')?.dataset.page === 'page-haojia';
  document.body.classList.toggle('mall-scroll-active', isMall && scrollTop >= 30);
}

if (mallContent) {
  mallContent.addEventListener('scroll', function() {
    updateMallHeader(this.scrollTop);
  }, {passive:true});
}

// 分类 tab 切换
const categoryPanelIds = window.HomeData?.categoryPanelIds || ['panel-hot', 'panel-waimai', 'panel-dache', 'panel-taobao', 'panel-jd', 'panel-douyin', 'panel-vip'];
const mallCategoryLabels = window.MallData?.categoryLabels || ['推荐', '母婴', '美食', '卫生巾', '美妆', '洗护', '母婴好物'];

document.querySelectorAll('.mall-category').forEach((category, index) => {
  if (mallCategoryLabels[index]) category.textContent = mallCategoryLabels[index];
});

function switchCategoryPanel(panelId) {
  if (!categoryPanelIds.includes(panelId)) return;
  const tab = document.querySelector(`#categoryTabs .tab[data-panel="${panelId}"]`);
  document.querySelectorAll('#categoryTabs .tab').forEach(t => t.classList.remove('active'));
  if (tab) {
    tab.classList.add('active');
    const tabsRow = document.getElementById('categoryTabs');
    const targetLeft = tab.offsetLeft - (tabsRow.clientWidth - tab.offsetWidth) / 2;
    tabsRow.scrollTo({left: Math.max(0, targetLeft), behavior:'smooth'});
  }
  categoryPanelIds.forEach(id => document.getElementById(id).classList.toggle('active', id === panelId));

  // 切换到内容更短的面板时，立即把页面滚动位置限制在新的有效范围内，避免触底后被浏览器反复校正。
  const homeContent = document.querySelector('#page-home > .content');
  if (homeContent) {
    const maxScrollTop = Math.max(0, homeContent.scrollHeight - homeContent.clientHeight);
    if (homeContent.scrollTop > maxScrollTop) homeContent.scrollTop = maxScrollTop;
  }
}

document.getElementById('categoryTabs').addEventListener('click', function(e) {
  const tab = e.target.closest('.tab');
  if (tab?.dataset.panel) switchCategoryPanel(tab.dataset.panel);
});

const homeMallMore = document.querySelector('.home-section-more');
if (homeMallMore) {
  homeMallMore.addEventListener('click', function() {
    document.querySelector('#bottomNav .nav-tab[data-page="page-haojia"]')?.click();
  });
}

categoryPanelIds.forEach(panelId => {
  const panel = document.getElementById(panelId);
  let gesture = null;

  function finishCategorySwipe(endX, endY) {
    if (!gesture) return;
    const deltaX = endX - gesture.x;
    const deltaY = endY - gesture.y;
    gesture = null;
    if (Math.abs(deltaX) < 56 || Math.abs(deltaX) <= Math.abs(deltaY) * 1.5) return;
    const currentIndex = categoryPanelIds.indexOf(panelId);
    const nextIndex = currentIndex + (deltaX < 0 ? 1 : -1);
    if (nextIndex >= 0 && nextIndex < categoryPanelIds.length) {
      switchCategoryPanel(categoryPanelIds[nextIndex]);
    }
  }

  panel.addEventListener('pointerdown', function(e) {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    gesture = {x:e.clientX, y:e.clientY, pointerId:e.pointerId};
  });
  panel.addEventListener('pointermove', function(e) {
    if (!gesture || gesture.pointerId !== e.pointerId) return;
    const deltaX = e.clientX - gesture.x;
    const deltaY = e.clientY - gesture.y;
    if (Math.abs(deltaY) > 12 && Math.abs(deltaY) >= Math.abs(deltaX) * 1.15) {
      gesture = null;
    }
  });
  panel.addEventListener('pointerup', function(e) {
    if (gesture && gesture.pointerId === e.pointerId) finishCategorySwipe(e.clientX, e.clientY);
  });
  panel.addEventListener('pointercancel', function() { gesture = null; });
});

const homeContent = document.querySelector('#page-home > .content');
document.body.classList.toggle('home-active', document.querySelector('.nav-tab.active')?.dataset.page === 'page-home');
if (homeContent) {
  homeContent.addEventListener('scroll', function() {
    updateHomeHeader(this.scrollTop);
  }, {passive:true});
}

// 柚子街商品详情与买后返现说明。
const productDetailPage = document.getElementById('page-product-detail');
const productDetailBack = document.querySelector('.product-detail-back');
const productOfferRulesPage = document.getElementById('productOfferRulesPage');
const productOfferRulesTrigger = document.getElementById('productOfferRulesTrigger');
const productOfferRulesBack = document.getElementById('productOfferRulesBack');
const productRebateSheet = document.getElementById('productRebateSheet');
const productRebateTrigger = document.getElementById('productRebateTrigger');
const productMoreCouponsList = document.getElementById('productMoreCouponsList');
const productMoreCouponsTrigger = document.getElementById('productMoreCouponsTrigger');
const productOrderButton = document.getElementById('productOrderButton');
const productFavoriteButton = document.getElementById('productFavoriteButton');
const productHomeButton = document.getElementById('productHomeButton');
const productDetailCarousel = document.getElementById('productDetailCarousel');
const productDetailHeroTrack = document.getElementById('productDetailHeroTrack');
const productDetailHeroDots = document.getElementById('productDetailHeroDots');
const productDetailHeroCount = document.getElementById('productDetailHeroCount');
let selectedMallProduct = null;
let productGallery = [];
let productGalleryIndex = 0;

const productGalleryImages = [
  'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1585232351009-aa87416fca90?auto=format&fit=crop&w=900&q=85'
];

function setProductGallerySlide(index) {
  if (!productGallery.length || !productDetailHeroTrack) return;
  productGalleryIndex = (index + productGallery.length) % productGallery.length;
  productDetailHeroTrack.style.transform = `translateX(-${productGalleryIndex * 100}%)`;
  productDetailHeroCount.textContent = `${productGalleryIndex + 1}/${productGallery.length}`;
  productDetailHeroDots.querySelectorAll('button').forEach((dot, dotIndex) => {
    const isActive = dotIndex === productGalleryIndex;
    dot.classList.toggle('active', isActive);
    dot.setAttribute('aria-current', isActive ? 'true' : 'false');
  });
}

function setProductGallery(product) {
  if (!productDetailHeroTrack || !productDetailHeroDots) return;
  const primaryImagePath = product.image.split('?')[0];
  const alternates = productGalleryImages.filter(image => image.split('?')[0] !== primaryImagePath).slice(0, 2);
  productGallery = [product.image, ...alternates];
  productGalleryIndex = 0;
  const slides = productGallery.map((image, index) => {
    const slide = document.createElement('img');
    slide.className = 'product-detail-hero-image';
    slide.src = image;
    slide.alt = index === 0 ? product.alt : `${product.alt} 展示图 ${index + 1}`;
    return slide;
  });
  productDetailHeroTrack.replaceChildren(...slides);
  productDetailHeroDots.replaceChildren(...productGallery.map((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `查看第 ${index + 1} 张商品图片`);
    dot.addEventListener('click', () => setProductGallerySlide(index));
    return dot;
  }));
  setProductGallerySlide(0);
}

function readMallProduct(card) {
  const getText = (selector) => card.querySelector(selector)?.textContent.trim() || '';
  const identity = getText('.mall-product-identity');
  const source = identity.split('|')[0].trim() || '商城';
  const coupon = identity.includes('|') ? identity.split('|').slice(1).join('|').trim() : '';
  const originalPrice = getText('.mall-product-meta span:first-child') || '¥0';
  const sold = getText('.mall-product-meta span:nth-child(2)') || '已售0';
  const store = card.dataset.store || `${source}精选店`;
  const gift = getText('.mall-product-tag-gift');
  const rebate = getText('.mall-product-tag-rebate').replace('再返', '') || '0.00元';
  const rebateValue = Number.parseFloat(rebate) || 0;
  const couponValue = Number.parseFloat(coupon) || 0;
  const giftValue = Number.parseFloat(gift) || 0.50;
  const baseValue = Math.max(0.01, rebateValue * 0.64).toFixed(2);
  const rewardValue = Math.max(0.01, rebateValue - Number(baseValue)).toFixed(2);
  return {
    image: card.querySelector('.mall-product-image img')?.src || '',
    alt: card.querySelector('.mall-product-image img')?.alt || '商品图片',
    title: getText('.mall-product-name'),
    source,
    store,
    sold,
    coupon,
    couponValue,
    originalPrice,
    gift,
    giftValue,
    rebate: `¥${rebateValue.toFixed(2)}`,
    base: `¥${baseValue}`,
    reward: `¥${rewardValue}`
  };
}

function setProductDetail(product) {
  document.getElementById('productDetailImage').src = product.image;
  document.getElementById('productDetailImage').alt = product.alt;
  setProductGallery(product);
  document.getElementById('productDetailSource').textContent = product.source;
  document.getElementById('productDetailTitle').textContent = product.title;
  document.getElementById('productDetailOriginalPrice').textContent = product.originalPrice;
  document.getElementById('productDetailStore').textContent = product.store;
  document.getElementById('productDetailSold').textContent = product.sold;
  document.getElementById('productDetailCoupon').textContent = (product.coupon || '¥0').replace(/券$/u, '');
  const productDetailGift = document.getElementById('productDetailGift');
  if (productDetailGift) productDetailGift.innerHTML = `<i>¥</i>${product.giftValue.toFixed(2)}起`;
  document.getElementById('productDetailRebate').textContent = product.rebate;
  document.getElementById('productRebateAmount').textContent = product.rebate;
  document.getElementById('productRebateBase').textContent = product.base;
  document.getElementById('productRebateReward').textContent = product.reward;
  const orderPrice = productOrderButton?.querySelector('small');
  if (orderPrice) {
    const originalPriceValue = Number.parseFloat(product.originalPrice.replace(/[^\d.]/g, '')) || 0;
    const rebateValue = Number.parseFloat(product.rebate.replace(/[^\d.]/g, '')) || 0;
    const savingPrice = Math.max(0, originalPriceValue - product.couponValue - rebateValue);
    orderPrice.textContent = `省钱价：￥${savingPrice.toFixed(2)}`;
    orderPrice.hidden = false;
  }
}

function openProductDetail(card) {
  if (!productDetailPage) return;
  selectedMallProduct = readMallProduct(card);
  setProductDetail(selectedMallProduct);
  document.querySelectorAll('body > .tab-page, body > div.tab-page').forEach(page => page.classList.remove('active'));
  productDetailPage.classList.add('active');
  document.body.classList.remove('home-active', 'home-scroll-active', 'life-active', 'life-scroll-active', 'mall-active', 'mall-scroll-active', 'butie-active', 'mine-active', 'mine-settings-active', 'search-active', 'wallet-active', 'pending-orders-active', 'withdrawn-details-active', 'cashback-red-packets-active', 'exclusive-coupon-active');
  document.body.classList.add('product-detail-active');
  document.getElementById('bottomNav').style.display = 'none';
  window.scrollTo(0, 0);
}

function closeProductDetail() {
  productRebateSheet.hidden = true;
  if (productOfferRulesPage) productOfferRulesPage.hidden = true;
  productDetailPage.classList.remove('active');
  document.getElementById('page-haojia').classList.add('active');
  document.body.classList.remove('product-detail-active');
  document.body.classList.add('mall-active');
  document.getElementById('bottomNav').style.display = '';
}

document.querySelectorAll('#page-haojia .mall-product').forEach(card => {
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.addEventListener('click', () => openProductDetail(card));
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openProductDetail(card);
    }
  });
});

if (productDetailBack) productDetailBack.addEventListener('click', closeProductDetail);
function closeProductOfferRules() {
  if (!productOfferRulesPage) return;
  productOfferRulesPage.hidden = true;
  productOfferRulesTrigger?.focus();
}
if (productOfferRulesTrigger && productOfferRulesPage) productOfferRulesTrigger.addEventListener('click', () => {
  productOfferRulesPage.hidden = false;
  productOfferRulesBack?.focus();
});
if (productOfferRulesBack) productOfferRulesBack.addEventListener('click', closeProductOfferRules);
if (productDetailCarousel) {
  let gestureStart = null;
  productDetailCarousel.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    gestureStart = {x:event.clientX, y:event.clientY, pointerId:event.pointerId};
  });
  productDetailCarousel.addEventListener('pointerup', (event) => {
    if (!gestureStart || gestureStart.pointerId !== event.pointerId) return;
    const deltaX = event.clientX - gestureStart.x;
    const deltaY = event.clientY - gestureStart.y;
    gestureStart = null;
    if (Math.abs(deltaX) < 42 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
    setProductGallerySlide(productGalleryIndex + (deltaX < 0 ? 1 : -1));
  });
  productDetailCarousel.addEventListener('pointercancel', () => { gestureStart = null; });
}
if (productRebateTrigger) productRebateTrigger.addEventListener('click', () => { productRebateSheet.hidden = false; });
document.querySelectorAll('[data-rebate-close]').forEach(button => button.addEventListener('click', () => { productRebateSheet.hidden = true; }));
if (productMoreCouponsTrigger && productMoreCouponsList) productMoreCouponsTrigger.addEventListener('click', () => {
  const isExpanded = productMoreCouponsTrigger.getAttribute('aria-expanded') === 'true';
  productMoreCouponsList.hidden = isExpanded;
  productMoreCouponsTrigger.setAttribute('aria-expanded', String(!isExpanded));
  const label = productMoreCouponsTrigger.querySelector('span');
  if (label) label.textContent = isExpanded ? '更多优惠' : '收起优惠';
});
if (productFavoriteButton) {
  productFavoriteButton.addEventListener('click', function() {
    const isFavorited = this.classList.toggle('is-favorited');
    this.setAttribute('aria-pressed', String(isFavorited));
    this.setAttribute('aria-label', isFavorited ? '取消收藏商品' : '收藏商品');
    this.querySelector('svg')?.setAttribute('fill', isFavorited ? 'currentColor' : 'none');
    const label = this.querySelector('.product-favorite-label');
    if (label) label.textContent = isFavorited ? '已收藏' : '收藏';
  });
}
if (productHomeButton) {
  productHomeButton.addEventListener('click', () => {
    productRebateSheet.hidden = true;
    productDetailPage.classList.remove('active');
    document.querySelector('#bottomNav .nav-tab[data-page="page-home"]')?.click();
  });
}
document.addEventListener('keydown', (event) => {
  if (productDetailPage?.classList.contains('active') && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
    setProductGallerySlide(productGalleryIndex + (event.key === 'ArrowRight' ? 1 : -1));
    return;
  }
  if (event.key !== 'Escape') return;
  if (productOfferRulesPage && !productOfferRulesPage.hidden) {
    closeProductOfferRules();
    return;
  }
  if (productRebateSheet && !productRebateSheet.hidden) {
    productRebateSheet.hidden = true;
    return;
  }
  if (productDetailPage?.classList.contains('active')) closeProductDetail();
});

// 生活服务页交互
document.getElementById('lifeTags').addEventListener('click', function(e) {
  const tag = e.target.closest('.life-tag');
  if (!tag) return;
  document.querySelectorAll('.life-tag').forEach(item => item.classList.remove('active'));
  tag.classList.add('active');
  const type = tag.dataset.type;
  document.querySelectorAll('.life-card').forEach(card => {
    card.style.display = type === '全部' || card.dataset.type === type ? 'flex' : 'none';
  });
});

document.getElementById('lifeFilters').addEventListener('click', function(e) {
  const filter = e.target.closest('.life-filter');
  if (!filter) return;
  document.querySelectorAll('#lifeFilters .life-filter').forEach(item => item.classList.remove('active'));
  filter.classList.add('active');
});

document.getElementById('lifeLocation').addEventListener('click', function() {
  const locationText = document.getElementById('locationText');
  const locations = window.LifeData?.locations || ['集美区', '厦门市'];
  const currentIndex = locations.indexOf(locationText.textContent);
  locationText.textContent = locations[(currentIndex + 1) % locations.length];
});

document.getElementById('lifeSearchButton').addEventListener('click', function() {
  const text = document.getElementById('lifeSearchText');
  const searchText = window.LifeData?.searchText || '搜附近商家和外卖';
  const searchingText = window.LifeData?.searchingText || '正在搜索附近商家...';
  text.textContent = text.textContent === searchText ? searchingText : searchText;
});

document.querySelectorAll('.life-card-button, #couponButton, #bannerAction').forEach(button => {
  button.addEventListener('click', function() {
    const original = this.textContent;
    this.textContent = '已领取';
    setTimeout(() => { this.textContent = original; }, 1200);
  });
});

const mineSettingsTrigger = document.querySelector('.mine-settings-trigger');
const mineSettingsPage = document.getElementById('page-mine-settings');
const mineSettingsBack = document.querySelector('.mine-settings-back');
const walletPage = document.getElementById('page-wallet');

if (walletPage && window.WalletPageTemplate) {
  walletPage.innerHTML = window.WalletPageTemplate;
}

const walletPageBack = document.querySelector('.wallet-page-back');
const walletTrigger = document.querySelector('.mine-wallet-withdrawable');

const pendingOrdersPage = document.getElementById('page-pending-orders');
if (pendingOrdersPage && window.PendingOrdersPageTemplate) {
  pendingOrdersPage.innerHTML = window.PendingOrdersPageTemplate;
}
const pendingOrdersBack = document.querySelector('.pending-orders-back');
const pendingOrdersTrigger = document.querySelector('.mine-pending-orders-trigger');
const withdrawnDetailsPage = document.getElementById('page-withdrawn-details');
if (withdrawnDetailsPage && window.WithdrawnDetailsPageTemplate) {
  withdrawnDetailsPage.innerHTML = window.WithdrawnDetailsPageTemplate;
}
const withdrawnDetailsBack = document.querySelector('.withdrawn-details-back');
const withdrawnDetailsTrigger = document.querySelector('.mine-withdrawn-details-trigger');
const cashbackRedPacketsPage = document.getElementById('page-cashback-red-packets');
if (cashbackRedPacketsPage && window.CashbackRedPacketsPageTemplate) {
  cashbackRedPacketsPage.innerHTML = window.CashbackRedPacketsPageTemplate;
}
const cashbackRedPacketsBack = document.querySelector('.cashback-red-packets-back');
const cashbackRedPacketsTrigger = document.querySelector('.mine-cashback-red-packets-trigger');
const subsidyTrigger = document.querySelector('.mine-subsidy-trigger');
const exclusiveCouponPage = document.getElementById('page-exclusive-coupon');
if (exclusiveCouponPage && window.ExclusiveCouponPageTemplate) {
  exclusiveCouponPage.innerHTML = window.ExclusiveCouponPageTemplate;
  exclusiveCouponPage.querySelectorAll('.exclusive-coupon-product-action button').forEach((button, index) => {
    const amounts = ['1.93元', '1.73元', '2.68元'];
    button.innerHTML = `<span>下单享</span><b>${amounts[index] || amounts[0]}专属优惠</b>`;
  });
}
const exclusiveCouponBack = document.querySelector('.exclusive-coupon-back');
const exclusiveCouponTrigger = document.querySelector('.mine-exclusive-coupon-trigger');

if (subsidyTrigger) {
  const openSubsidyPage = function() {
    document.querySelector('#bottomNav .nav-tab[data-page="page-butie"]')?.click();
  };
  subsidyTrigger.addEventListener('click', openSubsidyPage);
  subsidyTrigger.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openSubsidyPage();
    }
  });
}

if (walletPage && walletPageBack && walletTrigger) {
  const openWalletPage = function() {
    document.querySelectorAll('body > .tab-page, body > div.tab-page').forEach(page => page.classList.remove('active'));
    walletPage.classList.add('active');
    document.body.classList.remove('home-active', 'home-scroll-active', 'life-active', 'life-scroll-active', 'mall-active', 'mall-scroll-active', 'butie-active', 'mine-active', 'mine-settings-active', 'search-active');
    document.body.classList.add('wallet-active');
    document.getElementById('bottomNav').style.display = 'none';
  };

  const closeWalletPage = function() {
    walletPage.classList.remove('active');
    document.getElementById('page-mine').classList.add('active');
    document.body.classList.remove('wallet-active');
    document.body.classList.add('mine-active');
    document.getElementById('bottomNav').style.display = '';
  };

  walletTrigger.addEventListener('click', openWalletPage);
  walletTrigger.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openWalletPage();
    }
  });
  walletPageBack.addEventListener('click', closeWalletPage);
}

if (pendingOrdersPage && pendingOrdersBack && pendingOrdersTrigger) {
  const setPendingOrdersFilter = function(filter) {
    const selectedFilter = filter || 'all';
    pendingOrdersPage.querySelectorAll('[data-order-filter]').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.orderFilter === selectedFilter);
    });
    pendingOrdersPage.querySelectorAll('.pending-order-card').forEach(card => {
      card.hidden = selectedFilter !== 'all' && card.dataset.orderStatus !== selectedFilter;
    });
    const emptyState = pendingOrdersPage.querySelector('.pending-orders-empty');
    if (emptyState) emptyState.hidden = selectedFilter !== 'refund';
  };

  const openPendingOrdersPage = function(filter) {
    setPendingOrdersFilter(filter);
    document.querySelectorAll('body > .tab-page, body > div.tab-page').forEach(page => page.classList.remove('active'));
    pendingOrdersPage.classList.add('active');
    document.body.classList.remove('home-active', 'home-scroll-active', 'life-active', 'life-scroll-active', 'mall-active', 'mall-scroll-active', 'butie-active', 'mine-active', 'mine-settings-active', 'search-active', 'wallet-active');
    document.body.classList.add('pending-orders-active');
    document.getElementById('bottomNav').style.display = 'none';
  };

  const closePendingOrdersPage = function() {
    pendingOrdersPage.classList.remove('active');
    document.getElementById('page-mine').classList.add('active');
    document.body.classList.remove('pending-orders-active');
    document.body.classList.add('mine-active');
    document.getElementById('bottomNav').style.display = '';
  };

  pendingOrdersPage.querySelector('.pending-orders-tabs')?.addEventListener('click', function(event) {
    const tab = event.target.closest('[data-order-filter]');
    if (tab) setPendingOrdersFilter(tab.dataset.orderFilter);
  });
  document.addEventListener('app:open-pending-orders', function(event) {
    openPendingOrdersPage(event.detail?.filter || 'all');
  });

  pendingOrdersTrigger.addEventListener('click', function() { openPendingOrdersPage('pending'); });
  pendingOrdersTrigger.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openPendingOrdersPage('pending');
    }
  });
  pendingOrdersBack.addEventListener('click', closePendingOrdersPage);
}

if (withdrawnDetailsPage && withdrawnDetailsBack && withdrawnDetailsTrigger) {
  const openWithdrawnDetailsPage = function() {
    document.querySelectorAll('body > .tab-page, body > div.tab-page').forEach(page => page.classList.remove('active'));
    withdrawnDetailsPage.classList.add('active');
    document.body.classList.remove('home-active', 'home-scroll-active', 'life-active', 'life-scroll-active', 'mall-active', 'mall-scroll-active', 'butie-active', 'mine-active', 'mine-settings-active', 'search-active', 'wallet-active', 'pending-orders-active');
    document.body.classList.add('withdrawn-details-active');
    document.getElementById('bottomNav').style.display = 'none';
  };

  const closeWithdrawnDetailsPage = function() {
    withdrawnDetailsPage.classList.remove('active');
    document.getElementById('page-mine').classList.add('active');
    document.body.classList.remove('withdrawn-details-active');
    document.body.classList.add('mine-active');
    document.getElementById('bottomNav').style.display = '';
  };

  withdrawnDetailsTrigger.addEventListener('click', openWithdrawnDetailsPage);
  withdrawnDetailsTrigger.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openWithdrawnDetailsPage();
    }
  });
  withdrawnDetailsBack.addEventListener('click', closeWithdrawnDetailsPage);
}

if (cashbackRedPacketsPage && cashbackRedPacketsBack && cashbackRedPacketsTrigger) {
  const openCashbackRedPacketsPage = function() {
    document.querySelectorAll('body > .tab-page, body > div.tab-page').forEach(page => page.classList.remove('active'));
    cashbackRedPacketsPage.classList.add('active');
    document.body.classList.remove('home-active', 'home-scroll-active', 'life-active', 'life-scroll-active', 'mall-active', 'mall-scroll-active', 'butie-active', 'mine-active', 'mine-settings-active', 'search-active', 'wallet-active', 'pending-orders-active', 'withdrawn-details-active');
    document.body.classList.add('cashback-red-packets-active');
    document.getElementById('bottomNav').style.display = 'none';
  };

  const closeCashbackRedPacketsPage = function() {
    cashbackRedPacketsPage.classList.remove('active');
    document.getElementById('page-mine').classList.add('active');
    document.body.classList.remove('cashback-red-packets-active');
    document.body.classList.add('mine-active');
    document.getElementById('bottomNav').style.display = '';
  };

  cashbackRedPacketsTrigger.addEventListener('click', openCashbackRedPacketsPage);
  cashbackRedPacketsTrigger.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openCashbackRedPacketsPage();
    }
  });
  cashbackRedPacketsBack.addEventListener('click', closeCashbackRedPacketsPage);
}

if (exclusiveCouponPage && exclusiveCouponBack && exclusiveCouponTrigger) {
  const openExclusiveCouponPage = function() {
    document.querySelectorAll('body > .tab-page, body > div.tab-page').forEach(page => page.classList.remove('active'));
    exclusiveCouponPage.classList.add('active');
    document.body.classList.remove('home-active', 'home-scroll-active', 'life-active', 'life-scroll-active', 'mall-active', 'mall-scroll-active', 'butie-active', 'mine-active', 'mine-settings-active', 'search-active', 'wallet-active', 'pending-orders-active', 'withdrawn-details-active', 'cashback-red-packets-active');
    document.body.classList.add('exclusive-coupon-active');
    document.getElementById('bottomNav').style.display = 'none';
  };

  const closeExclusiveCouponPage = function() {
    exclusiveCouponPage.classList.remove('active');
    document.getElementById('page-mine').classList.add('active');
    document.body.classList.remove('exclusive-coupon-active');
    document.body.classList.add('mine-active');
    document.getElementById('bottomNav').style.display = '';
  };

  exclusiveCouponTrigger.addEventListener('click', openExclusiveCouponPage);
  exclusiveCouponTrigger.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openExclusiveCouponPage();
    }
  });
  exclusiveCouponBack.addEventListener('click', closeExclusiveCouponPage);
}

const homeSearchTrigger = document.querySelector('.search-inner');
const searchPage = document.getElementById('page-search');
const searchPageBack = document.querySelector('.search-page-back');

if (homeSearchTrigger && searchPage && searchPageBack) {
  const searchInput = document.getElementById('searchOfferInput');
  const openSearchPage = function() {
    document.querySelectorAll('body > .tab-page, body > div.tab-page').forEach(page => page.classList.remove('active'));
    searchPage.classList.add('active');
    document.body.classList.remove('home-active', 'home-scroll-active', 'life-active', 'life-scroll-active', 'mall-active', 'mall-scroll-active', 'butie-active', 'mine-active', 'mine-settings-active');
    document.body.classList.add('search-active');
    document.getElementById('bottomNav').style.display = 'none';
    window.setTimeout(() => searchInput?.focus(), 0);
  };

  const closeSearchPage = function() {
    searchPage.classList.remove('active');
    document.getElementById('page-home').classList.add('active');
    document.body.classList.remove('search-active');
    document.body.classList.add('home-active');
    document.getElementById('bottomNav').style.display = '';
    updateHomeHeader(document.querySelector('#page-home > .content')?.scrollTop || 0);
  };

  homeSearchTrigger.addEventListener('click', openSearchPage);
  searchPageBack.addEventListener('click', closeSearchPage);

  document.getElementById('searchPasteButton')?.addEventListener('click', async function() {
    try {
      const text = await navigator.clipboard.readText();
      if (text) searchInput.value = text;
    } catch (error) {
      searchInput.focus();
    }
  });

  document.querySelectorAll('.search-history-chip').forEach(chip => {
    chip.addEventListener('click', function() {
      searchInput.value = this.textContent.trim();
      searchInput.focus();
    });
  });

  document.getElementById('clearSearchHistory')?.addEventListener('click', function() {
    document.getElementById('searchHistoryList').replaceChildren();
  });

  document.getElementById('searchOfferButton')?.addEventListener('click', function() {
    const value = searchInput.value.trim();
    if (!value) {
      searchInput.focus();
      return;
    }
    this.classList.add('is-searching');
    this.lastChild.textContent = ' 正在搜索';
    window.setTimeout(() => {
      this.classList.remove('is-searching');
      this.lastChild.textContent = ' 搜优惠';
    }, 900);
  });
}

if (mineSettingsTrigger && mineSettingsPage) {
  const openMineSettings = function() {
    document.querySelectorAll('body > .tab-page, body > div.tab-page').forEach(page => page.classList.remove('active'));
    mineSettingsPage.classList.add('active');
    document.body.classList.remove('mine-active');
    document.body.classList.add('mine-settings-active');
    document.getElementById('bottomNav').style.display = 'none';
    mineSettingsTrigger.setAttribute('aria-expanded', 'true');
  };

  const closeMineSettings = function() {
    mineSettingsPage.classList.remove('active');
    document.getElementById('page-mine').classList.add('active');
    document.body.classList.remove('mine-settings-active');
    document.body.classList.add('mine-active');
    document.getElementById('bottomNav').style.display = '';
    mineSettingsTrigger.setAttribute('aria-expanded', 'false');
  };

  mineSettingsTrigger.addEventListener('click', openMineSettings);
  mineSettingsTrigger.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openMineSettings();
    }
  });
  mineSettingsBack.addEventListener('click', closeMineSettings);
}

const recentArrivalContent = document.getElementById('mineRecentArrivalContent');

if (recentArrivalContent) {
  const recentArrival = recentArrivalContent.closest('.mine-recent-arrival');
  const recentArrivalItems = [
    { icon: 'taobao.svg', text: '￥0.19已到账', label: '最近到账 ￥0.19' },
    { icon: 'douyin.svg', text: '￥13.28已到账', label: '最近到账 ￥13.28' }
  ];
  let recentArrivalIndex = 0;
  let currentArrivalContent = recentArrivalContent;

  window.setInterval(function() {
    recentArrivalIndex = (recentArrivalIndex + 1) % recentArrivalItems.length;
    const item = recentArrivalItems[recentArrivalIndex];
    const nextContent = currentArrivalContent.cloneNode(true);
    const nextIcon = nextContent.querySelector('.mine-recent-arrival-icon');
    const nextText = nextContent.querySelector('.mine-recent-arrival-text');

    nextContent.removeAttribute('id');
    nextIcon.removeAttribute('id');
    nextText.removeAttribute('id');
    nextIcon.src = item.icon;
    nextText.textContent = item.text;
    nextContent.classList.add('is-rolling-next');
    nextContent.classList.add('is-rolling-in');
    recentArrival.appendChild(nextContent);
    if (recentArrival) recentArrival.setAttribute('aria-label', item.label);

    window.requestAnimationFrame(function() {
      currentArrivalContent.classList.add('is-rolling-out');
      nextContent.classList.remove('is-rolling-in');
    });

    window.setTimeout(function() {
      currentArrivalContent.remove();
      nextContent.classList.remove('is-rolling-next');
      currentArrivalContent = nextContent;
    }, 280);
  }, 2000);
}
