document.addEventListener('DOMContentLoaded', function() {
    // 加载配置数据
    loadConfig();
    
    // 计算域名运行时间
    calculateDomainUptime();
    
    // 初始化粒子背景
    try {
        new ParticleBackground();
        console.log('粒子背景初始化成功');
    } catch (error) {
        console.error('粒子背景初始化失败:', error);
    }
    
    // 为所有卡片添加点击效果
    const cards = document.querySelectorAll('.address-card');
    cards.forEach(card => {
        const btn = card.querySelector('.access-btn');
        if (btn) {
            card.addEventListener('click', function(e) {
                // 如果点击的不是按钮本身，则触发按钮点击
                if (e.target !== btn && !e.target.closest('.access-btn')) {
                    btn.click();
                }
            });
        }
    });
    
    // 修复iOS设备上的滚动问题
    document.addEventListener('touchmove', function(e) {
        // 允许默认的触摸移动行为
    }, { passive: true });
});

// 加载配置文件并渲染页面内容
function loadConfig() {
    fetch('config.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('配置文件加载失败');
            }
            return response.json();
        })
        .then(config => {
            // 更新网站标题
            if (config.siteInfo && config.siteInfo.title) {
                document.title = config.siteInfo.title;
                const siteTitleElement = document.querySelector('.site-title');
                if (siteTitleElement) {
                    siteTitleElement.textContent = config.siteInfo.title;
                }
            }
            
            // 更新收藏提示
            if (config.siteInfo && config.siteInfo.bookmarkTip) {
                const bookmarkTipElement = document.querySelector('.bookmark-tip p');
                if (bookmarkTipElement) {
                    bookmarkTipElement.textContent = config.siteInfo.bookmarkTip;
                }
            }
            
            // 渲染地址卡片
            if (config.addresses && Array.isArray(config.addresses)) {
                renderAddressCards(config.addresses);
            }
            
            // 渲染访问提示
            if (config.accessTips) {
                renderAccessTips(config.accessTips);
            }
            
            // 更新页脚版权信息
            if (config.footer && config.footer.copyright) {
                const copyrightElement = document.getElementById('copyright');
                if (copyrightElement) {
                    copyrightElement.innerHTML = `&copy; <script>document.write(new Date().getFullYear())</script> ${config.footer.copyright}`;
                }
            }
        })
        .catch(error => {
            console.error('加载配置文件时出错:', error);
        });
}

// 渲染地址卡片
function renderAddressCards(addresses) {
    const addressSection = document.querySelector('.address-section');
    if (!addressSection) return;
    
    // 清空现有内容
    addressSection.innerHTML = '';
    
    // 为每个地址创建卡片
    addresses.forEach(address => {
        const card = document.createElement('div');
        card.className = 'address-card';
        
        card.innerHTML = `
            <div class="card-info">
                <h2>${address.title}</h2>
                <p class="url">${address.url}</p>
            </div>
            <a href="${address.url}" target="_blank" class="access-btn">点击进入</a>
        `;
        
        addressSection.appendChild(card);
    });
}

// 渲染访问提示
function renderAccessTips(accessTips) {
    const tipsSection = document.querySelector('.access-tips');
    if (!tipsSection) return;
    
    // 清空现有内容
    tipsSection.innerHTML = '';
    
    // 创建标题
    const titleElement = document.createElement('p');
    titleElement.innerHTML = `<strong>${accessTips.title}</strong>`;
    tipsSection.appendChild(titleElement);
    
    // 创建提示列表
    if (accessTips.tips && Array.isArray(accessTips.tips)) {
        const listElement = document.createElement('ul');
        
        accessTips.tips.forEach(tip => {
            const liElement = document.createElement('li');
            liElement.textContent = tip;
            listElement.appendChild(liElement);
        });
        
        tipsSection.appendChild(listElement);
    }
}

// 计算域名运行时间函数
function calculateDomainUptime() {
    const startDate = new Date('2018-03-08T00:00:00');
    const now = new Date();
    
    const diffTime = Math.abs(now - startDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffYears = Math.floor(diffDays / 365);
    const remainingDays = diffDays % 365;
    const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    const diffSeconds = Math.floor((diffTime % (1000 * 60)) / 1000);
    
    let timeString = '';
    
    if (diffYears > 0) {
        timeString = `${diffYears} 年 ${remainingDays} 天 ${diffHours} 时 ${diffMinutes} 分 ${diffSeconds} 秒`;
    } else if (diffDays > 0) {
        timeString = `${diffDays} 天 ${diffHours} 时 ${diffMinutes} 分 ${diffSeconds} 秒`;
    } else {
        timeString = `${diffHours} 时 ${diffMinutes} 分 ${diffSeconds} 秒`;
    }
    
    const domainTimeElement = document.getElementById('domain-time');
    if (domainTimeElement) {
        domainTimeElement.textContent = timeString;
    }
    
    // 每秒钟更新一次
    setTimeout(calculateDomainUptime, 1000);
}