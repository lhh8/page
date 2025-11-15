// 简单的API端点，用于获取配置数据
// 这个文件可以被其他应用调用来获取最新的配置信息

// 导出配置数据（如果使用Node.js环境）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getConfig: function() {
            const fs = require('fs');
            const path = require('path');
            
            try {
                const configPath = path.join(__dirname, 'config.json');
                const configData = fs.readFileSync(configPath, 'utf8');
                return JSON.parse(configData);
            } catch (error) {
                console.error('读取配置文件失败:', error);
                return null;
            }
        }
    };
}

// 如果在浏览器环境中，可以通过fetch获取配置数据
if (typeof window !== 'undefined') {
    window.getConfig = function(callback) {
        fetch('config.json')
            .then(response => response.json())
            .then(config => callback(null, config))
            .catch(error => callback(error, null));
    };
}