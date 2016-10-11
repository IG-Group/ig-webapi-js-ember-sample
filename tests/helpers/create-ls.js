/*global Lightstreamer:true */
export default function createLs() {
	Lightstreamer = {};
	Lightstreamer.LightstreamerClient = function() {
		return {
			id: 1,
			connect: function() {
				return true;
			},
			addListener: function() {
				return true;
			},
			subscribe: function() {
				return true;
			},
			connectionDetails: {
				id: 2,
				setUser: function() {
					return true;
				},
				setPassword: function() {
					return true;
				},
			}
		};
	};
	Lightstreamer.Subscription = function() {
		return {
			setRequestedSnapshot: function() {
				return true;
			},
			addListener: function() {
				return true;
			},
			setRequestedMaxFrequency: function() {
				return true;
			}
		};
	};
	return Lightstreamer;
}
