define(["events","appStorage"],function(events,appStorage){"use strict";function ensure(instance,data){if(!instance._credentials){var json=appStorage.getItem(instance.key)||"{}";console.log("credentials initialized with: "+json),instance._credentials=JSON.parse(json),instance._credentials.Servers=instance._credentials.Servers||[]}}function set(instance,data){data?(instance._credentials=data,appStorage.setItem(instance.key,JSON.stringify(data))):instance.clear(),events.trigger(instance,"credentialsupdated")}function Credentials(key){this.key=key||"servercredentials3"}return Credentials.prototype.clear=function(){this._credentials=null,appStorage.removeItem(this.key)},Credentials.prototype.credentials=function(data){return data&&set(this,data),ensure(this),this._credentials},Credentials.prototype.addOrUpdateServer=function(list,server){if(!server.Id)throw new Error("Server.Id cannot be null or empty");var existing=list.filter(function(s){return s.Id===server.Id})[0];return existing?(existing.DateLastAccessed=Math.max(existing.DateLastAccessed||0,server.DateLastAccessed||0),existing.UserLinkType=server.UserLinkType,server.AccessToken&&(existing.AccessToken=server.AccessToken,existing.UserId=server.UserId),server.ExchangeToken&&(existing.ExchangeToken=server.ExchangeToken),server.RemoteAddress&&(existing.RemoteAddress=server.RemoteAddress),server.ManualAddress&&(existing.ManualAddress=server.ManualAddress),server.LocalAddress&&(existing.LocalAddress=server.LocalAddress),server.Name&&(existing.Name=server.Name),server.WakeOnLanInfos&&server.WakeOnLanInfos.length&&(existing.WakeOnLanInfos=server.WakeOnLanInfos),null!=server.LastConnectionMode&&(existing.LastConnectionMode=server.LastConnectionMode),server.ConnectServerId&&(existing.ConnectServerId=server.ConnectServerId),existing):(list.push(server),server)},Credentials.prototype.addOrUpdateUser=function(server,user){server.Users=server.Users||[];var existing=server.Users.filter(function(s){return s.Id===user.Id})[0];existing?existing.IsSignedInOffline=!0:server.Users.push(user)},Credentials});