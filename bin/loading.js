const ora = require('ora');
const loading = ora('Loading');

exports.startLoading = (text = '加载中...') => {
  loading.text = text;
  loading.color = 'green';
  loading.start();
};

exports.endLoading = () => {
  loading.stop();
};