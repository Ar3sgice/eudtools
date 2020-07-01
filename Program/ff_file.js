if(typeof localStorage != "undefined")
{
	if(!localStorage.flFiles)
	{
		localStorage.flFiles = "";
	}
	var flStorage = {};
	(function(){
		if(localStorage.flFiles.toString().length < 1)
		{
			return;
		}
		var fsp = localStorage.flFiles.toString().split("|");
		for(var i in fsp)
		{
			var rs = fsp[i].split(":");
			if(!rs || !rs.length || rs.length == 1 || rs.length >= 3)
			{
				continue;
			}
			var filePath = rs[0].replace(";",":");
			var content = rs[1];
			while(content.match(/<[0-9a-f]{1,4}>/i))
			{
				try
				{
					var matchData = content.match(/<([0-9a-f]{1,4})>/i)[1];
					content = content.replace(new RegExp("<" + matchData + ">", "ig"), String.fromCharCode(parseInt(matchData, 16)));
				}
				catch(E)
				{
					break;
				}
			}
			flStorage[filePath] = content;
		}
	})();
}

var _flF_rep = ":;|&*?".split("");
function _flF_str()
{
	if(typeof localStorage == "undefined")
	{
		return false;
	}
	var op = [];
	for(var p in flStorage)
	{
		var filePath = p.replace(":",";");
		var content = flStorage[p];
		for(var i in _flF_rep)
		{
			content = content.replace((new RegExp("\\" + _flF_rep[i],"g")), "<" + toHex(_flF_rep[i].charCodeAt(0)) + ">");
		}
		op.push(filePath + ":" + content);
	}
	localStorage.flFiles = op.join("|");
}
	
function flFile(p, sp, m)
{
	m = m || 1;
	this.filePath = p;
	this.Path = p;
	this.content = sp || "";
	this.handleMode = m;
	this.ReadAll = function()
	{
		return this.content;
	};
	this.Close  = function()
	{
		this.dispose();
	};
	this.close = this.Close;
	this.Write = function(s)
	{
		if(typeof localStorage == "undefined")
		{
			return false;
		}
		// change into flLocalStorage file
		if(this.handleMode == 2)
		{
			var fpn = new flLocalStorageFile(p,2);
			fpn.Write(s);
			fpn.Close();
			return true;
		}
		else if(this.handleMode == 8)
		{
			var fpn = new flLocalStorageFile(p,2);
			fpn.Write(this.content + s);
			fpn.Close();
			return true;
		}
		return false;
	};
	this.write = this.Write;
	this.dispose = function()
	{
		for(var w in this)
		{
			delete this[w];
		}
	};
}

function _flF_pRP(p)
{
	if(!p.match(/\:/i)) // relative path
	{
		p = p.replace(/\\/g,"/");
		var baseURI = location.toString();
		var baseURIPath = baseURI.replace(/[^\\\/\:\t]*$/g,"");
		if(p.match(/^\x2F/i))
		{
			if(location.protocol.toString().toLowerCase() == "http:")
			{
				p = location.protocol.toString() + "//" + location.host.toString() + p;
			}
			else
			{
				p = "file:///" + baseURIPath.match(/([A-Z])\:/i)[1].toUpperCase() + ":" + p;
			}
		}
		else
		{
			p = baseURIPath + p;
		}
	}
	if(p.match(/^file\:/i))
	{
		p = p.replace("file:/"+"/"+"/","");
		p = p.replace(/\x2F/g,"\\");
		p = decodeURIComponent(p);
	}
	return p;
}

function flLocalStorageFile(p, m)
{
	if(typeof localStorage == "undefined")
	{
		return;
	}
	
	m = m || 1;
	p = _flF_pRP(p);
	
	if(flStorage[p])
	{
		this.content = flStorage[p];
		this.handleMode = m;
	}
	else
	{
		this.content = flStorage[p] = "";
		this.handleMode = m;
	}
	
	this.Path = this.filePath = p;
	
	this.ReadAll = function()
	{
		return this.content;
	};
	this.Close  = function()
	{
		this.dispose();
	};
	this.close = this.Close;
	this.Write = function(s)
	{
		if(this.handleMode == 2)
		{
			this.content = flStorage[p] = s;
			_flF_str();
			return true;
		}
		else if(this.handleMode == 8)
		{
			this.content = flStorage[p] += s;
			_flF_str();
			return true;
		}
		return false;
	};
	this.write = this.Write;
	this.dispose = function()
	{
		for(var w in this)
		{
			delete this[w];
		}
	};
}

function flObject()
{
	this.FileExistsLS = function(spp)
	{
		if(typeof localStorage == "undefined")
		{
			return false;
		}
		spp = _flF_pRP(spp);
		if(flStorage[spp])
		{
			return true;
		}
		return false;
	}
	this.FileExists = function(spp)
	{
		if(this.FileExistsLS(spp))
		{
			return true;
		}
		try
		{
			var xhr = new XMLHttpRequest();
			xhr.open("GET",spp,false);
			xhr.send(null);
			if(xhr.readyState == 4 && xhr.status == 200)
			{
				return true;
			}
		}
		catch(E){return false;}
		return false;
	};
	this.OpenTextFile = function(spp,m)
	{
		if(this.FileExistsLS(spp))
		{
			return new flLocalStorageFile(spp, m);
		}
		var xhr = new XMLHttpRequest();
		xhr.open("GET",spp,false);
		xhr.send(null);
		if(xhr.readyState == 4)
		{
			return new flFile(spp,xhr.responseText);
		}
		else // irresponsibly throw an error
		{
			throw new Error("Requested file does not exist.");
		}
	};
	this.CreateTextFile = function(spp)
	{
		if(typeof localStorage == "undefined")
		{
			return false;
		}
		if(this.FileExistsLS(spp))
		{
			var fs = new flLocalStorageFile(spp, 2);
			fs.Write("");
			return fs;
		}
		else
		{
			return new flLocalStorageFile(spp, 2);
		}
	};
}