Module.register('MMM-myip', {
	defaults: {
		updateInterval: 1000*60,
	},

	networkInfo: null,

	start: function() {
		this.loop();
	},

	loop: function() {
		let self = this;
		setInterval(() => {
			self.sendSocketNotification('GET_NETWORK_INFO');
		}, self.config.updateInterval);
	},

	getDom: function() {
		var table = document.createElement('table');
		if(this.networkInfo == null || !this.networkInfo)
		{
			var tr = document.createElement('tr');
			var td = document.createElement('td');
			td.innerText = 'No Network Info';
			tr.appendChild(td);
			table.appendChild(tr);
			return table;
		}

		this.networkInfo.forEach(ni => {
			var tr = document.createElement('tr');
			var n = document.createElement('td');
			n.innerText = ni.name;
			tr.appendChild(n);
			var a = document.createElement('td');
			a.innerText = ni.address;
			tr.appendChild(a);
			table.appendChild(tr);
		});

		return table;
	},

	socketNotificationReceived: function(notification, payload) {
		if(notification === 'NETWORK_INFO')
		{
			this.networkInfo = payload;
			this.updateDom();
		}
	}
});
