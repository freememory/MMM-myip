const NodeHelper = require('node_helper');
const pip = require('public-ip');
const iip = require('internal-ip');

module.exports = NodeHelper.create({
	info: null,
	
	start() {
		let self = this;
		setInterval(() => {
			self.fetchIps();
		}, 60000);
	},

	fetchIps() {
		let self = this;
		self.info = [];
		pip.v4().then(ipAddr => {
			self.info.push({
				name: 'External IP',
				address: ipAddr
			});
		});
	
		iip.v4().then(ipAddr => {
			self.info.push({
				name: 'Internal IP',
				address: ipAddr
			});
		});		
	},

	socketNotificationReceived(notification) {
		if(notification === 'GET_NETWORK_INFO')
		{
			this.sendSocketNotification('NETWORK_INFO', this.info); 
		}
	}
});
