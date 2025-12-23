/**
 * 可复用的标签切换组件
 * 使用方法：
 * 1. HTML结构：
 *    <div id="tabs-container-id" class="tabs-container">
 *      <div class="tabs-header">
 *        <button class="tab-btn active" data-tab="tab1">标签1</button>
 *        <button class="tab-btn" data-tab="tab2">标签2</button>
 *      </div>
 *      <div class="tabs-content">
 *        <div class="tab-panel active" id="tab1">内容1</div>
 *        <div class="tab-panel" id="tab2">内容2</div>
 *      </div>
 *    </div>
 * 
 * 2. 初始化：
 *    initTabs('tabs-container-id');
 */

function initTabs(containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.warn(`Tabs container with id "${containerId}" not found`);
        return;
    }

    const tabButtons = container.querySelectorAll('.tab-btn');
    const tabPanels = container.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // 移除所有活动状态
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            // 添加当前活动状态
            button.classList.add('active');
            const targetPanel = container.querySelector(`#${targetTab}`);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

// 页面加载完成后自动初始化所有标签容器
document.addEventListener('DOMContentLoaded', () => {
    const tabContainers = document.querySelectorAll('.tabs-container');
    tabContainers.forEach((container, index) => {
        if (container.id) {
            initTabs(container.id);
        } else {
            // 如果没有ID，自动生成一个
            const autoId = `tabs-container-${index}`;
            container.id = autoId;
            initTabs(autoId);
        }
    });
});

// 导出函数供其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initTabs };
}

