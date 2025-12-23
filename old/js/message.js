/**
 * 留言功能
 */
document.addEventListener('DOMContentLoaded', () => {
    const messageForm = document.getElementById('messageForm');
    const messagesContainer = document.getElementById('messagesContainer');

    // 从本地存储加载留言
    loadMessages();

    // 表单提交处理
    if (messageForm) {
        messageForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(messageForm);
            const message = {
                id: Date.now(),
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone') || '',
                subject: formData.get('subject'),
                message: formData.get('message'),
                date: new Date().toLocaleString('zh-CN')
            };

            // 保存到本地存储
            saveMessage(message);
            
            // 显示留言
            displayMessage(message);
            
            // 重置表单
            messageForm.reset();
            
            // 显示成功提示
            showNotification('留言提交成功！', 'success');
        });
    }
});

function saveMessage(message) {
    let messages = JSON.parse(localStorage.getItem('messages') || '[]');
    messages.unshift(message); // 新留言添加到最前面
    
    // 只保留最近50条留言
    if (messages.length > 50) {
        messages = messages.slice(0, 50);
    }
    
    localStorage.setItem('messages', JSON.stringify(messages));
}

function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('messages') || '[]');
    const messagesContainer = document.getElementById('messagesContainer');
    
    if (!messagesContainer) return;
    
    if (messages.length === 0) {
        messagesContainer.innerHTML = '<p style="color: var(--text-light); text-align: center;">暂无留言</p>';
        return;
    }
    
    messagesContainer.innerHTML = '';
    messages.forEach(message => {
        displayMessage(message, false);
    });
}

function displayMessage(message, append = true) {
    const messagesContainer = document.getElementById('messagesContainer');
    if (!messagesContainer) return;
    
    const messageElement = document.createElement('div');
    messageElement.className = 'message-item';
    messageElement.innerHTML = `
        <div class="message-item-header">
            <span class="message-author">${escapeHtml(message.name)}</span>
            <span class="message-date">${message.date}</span>
        </div>
        <div class="message-subject">${escapeHtml(message.subject)}</div>
        <div class="message-content">${escapeHtml(message.message)}</div>
        ${message.phone ? `<div class="message-contact" style="margin-top: 0.5rem; font-size: 0.9rem; color: var(--text-light);">联系方式: ${escapeHtml(message.phone)} | ${escapeHtml(message.email)}</div>` : ''}
    `;
    
    if (append) {
        messagesContainer.insertBefore(messageElement, messagesContainer.firstChild);
    } else {
        messagesContainer.appendChild(messageElement);
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 添加动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

