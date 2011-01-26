//State objects
var lines = [];
var selected_tag=undefined;

String.prototype.format = function()
{
	var formatted = this;
	for(var i= 0; i < arguments.length;i++){
		//extra escapes due to regexp
		//'gi' are regexp modifers, global, case-insensitive
		var regexp = new RegExp('\\{'+i+'\\}','gi');
		formatted = formatted.replace(regexp,arguments[i]);
	}
	return formatted;
}

function length(x1,y1,x2,y2)
{
	return Math.sqrt(Math.pow(x1-x2),2)+Math.pow((y1-y2),2);
}

drawLine = function (canvas,x,y,x2,y2){
	canvas.moveTo(x,y);
	canvas.lineTo(x2,y2);
	canvas.stroke();

	var str = "({0},{1}),({2},{3})".format(x,y,x2,y2);
	$("#object_list").append("<p>"+str+"</p>");
	//$("#object_list").append("<p>("+x+","+y+")"+" ("+x2+","+y2+")</p>");
	lines.push([x,y,x2,y2])
}

function cbLineGen(canvas)
{
	var lastx =-1, lasty=-1;
	var position = $("canvas").position();
	cbLine = function(e)
	{
		var curx = e.x-position.top,cury=e.y-position.left;
		if(lastx >= 0)
		{
			drawLine(canvas, curx, cury,lastx,lasty);
			lastx = -1;
			lasty = -1;
			return;
		}
		lastx=curx;lasty=cury;
	}
	return cbLine;
}

function select_item(event)
{
	$(selected_tag).css("background","#FFFFFF");
	$(event.target).css("background","#00FFFF");
	selected_tag=event.target;
}

canvastag=(document.getElementById("Canvas"));
canvas = canvastag.getContext('2d');
drawLine(canvas,0,0,10,10);

canvastag.addEventListener("mousedown",cbLineGen(canvas),true);
$("#object_list").click(select_item);
