drawLine = function (canvas,x,y,x2,y2){
	canvas.moveTo(x,y);
	canvas.lineTo(x2,y2);
	canvas.stroke()
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
		}
		lastx=curx;lasty=cury;
	}
	return cbLine;
}

canvastag=(document.getElementById("Canvas"));
canvas = canvastag.getContext('2d');
drawLine(canvas,0,0,10,10);

document.addEventListener("mousedown",cbLineGen(canvas),true);
