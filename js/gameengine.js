/*
 ___________________________
/                           \
| o        S' GIT         o |
|   Solothurn & Grenchen    |
|       Institutes of       |
| o   gaming Technology   o |
\___________________________/

by Benedict Jäggi @ MMXX

Basic game-engine functions:
	getDeltaTime gets the ticks (ms) since the last frame update.
	UPDATE -> call this after each frame.
*/

// general log function
// NEW: Using the one from the GIMLI-parser.
//var log = function(txt)
//{
//	console.log(txt);
//}

// https://keycode.info/
// standard key codes.
var KEY_LEFT=37;
var KEY_RIGHT=39;
var KEY_UP=38;
var KEY_DOWN=40;
var KEY_SPACE=32;
var KEY_ESC=27;

var KEY_W=87;
var KEY_A=65;
var KEY_S=83;
var KEY_D=68;


// the game engine GE.
var GE = function() 
{
	var me = this; // prevent stuff from getting this'ed.
	this.m_deltatime;
	this.m_lastUpdate = Date.now();
	var m_myInterval = null;
	var m_updatefunction = null;
	var m_actualDisplayID = "";
	var m_mainDisplayID = "";
	
	this.getActualDisplayID=function() {return m_actualDisplayID;}
	var m_actualDisplayBuffer = 0;
	
	var ma_keyCode=[]
	this.getKeyDown=function(code)
	{
		return ma_keyCode[code];
	}
	
	this.getDeltaTime = function() {return m_deltatime;}
	this.INIT = function(mainscreenID,updatefunc = null)
	{
		m_mainDisplayID=mainscreenID
		m_updatefunction = updatefunc;
		m_myInterval = setInterval(GE.tick,10);
		log("[ OK ] Game Engine GE initialized.")
		
		// add the two buffer displays        absolute       640px         480px
		var html="";
		html+='<div id="jbashWindow">';// jbash window is controlled by code and css.
		html+='Welcome to Agis Game Console.<br/>Type "cmd" for a list of all commmands.</div>';
		html+='</div>';
		html+='<div id="GEdiBuf0" style="position:absolute; width:640px; height:480px; top:0px; left:0px;"></div>';
		html+='<div id="GEdiBuf1" style="position:absolute; width:640px; height:480px;  top:0px; left:0px;"></div>';
		$(m_mainDisplayID).append(html);
		
		// initialize jBash
		jBash.initialize("#jbashWindow");
		jBash.instance.AddLine("Welcome to Agis Game Interface.");
		jBash.instance.AddLine("Type 'cmd' for a list with all commands.");
		
		// init keycodes list
		ma_keyCode=[]
		for(var i=0;i<255;i++)
		{
			var c=0;
			ma_keyCode.push(c);
		}
		
		// get key events.
		$("body").on('keydown', __keydownfunc)
		$("body").on('keyup', __keyupfunc)
	}
	
	// show the console or not. position will be updated in update window.
	var m_consoleShow=0;
	this.showConsole=function(show) {m_consoleShow=show;}
	this.isConsole=function() {return m_consoleShow;}
	
	// the key down event handler.
	var __keydownfunc=function(evt)
	{
		var c = evt.keyCode;
		//log("keydown "+c);
		ma_keyCode[c]=1
	}
	
	// the key up event handler.
	var __keyupfunc=function(evt)
	{
		var c = evt.keyCode;
		//log("keyup "+c);
		ma_keyCode[c]=0
		
		// maybe show or hide jbash console.
		if(c==KEY_ESC)
		{
			me.showConsole(Math.abs(me.isConsole()-1));
		}
	}

	this.RENDER = function(deltatime)
	{
		// show the actual display.
		$(m_actualDisplayID).css('display','block');
		
		// flip the buffer id.
		m_actualDisplayBuffer = Math.abs(m_actualDisplayBuffer-1); //switch between 0&1
		m_actualDisplayID = "#GEdiBuf"+m_actualDisplayBuffer;
		
		// hide the (new) actual display.
		$(m_actualDisplayID).css('display', 'none');
		
		// hide the actual display.
		me.clearActualDisplay();
	}
	
	// clear the actual display buffer.
	this.clearActualDisplay = function() {$(m_actualDisplayID).html("");}
	// get width and height of display.
	this.getActualDisplayWidth = function() {return $(m_actualDisplayID).width();}
	this.getActualDisplayHeight = function() {return $(m_actualDisplayID).height();}
	
	var m_consoleruns=1;
	this.UPDATE = function(deltatime)
	{
		if(m_updatefunction!=null)
			m_updatefunction(me.m_deltatime)
			
		// maybe show the console or not.
		var consolepos=parseInt($('#jbashWindow').css('top'));
		if(me.isConsole()>0 && consolepos<0)
		{
			//log("SHOW CONSOLE "+me.isConsole())
			m_consoleruns=1;
			consolepos+=deltatime*640;
			if(consolepos>0)
				consolepos=0;
			$('#jbashWindow').css('top',consolepos+'px');
			$('#jBashInnerInput').focus();
		}
		
		if(me.isConsole()<=0 && m_consoleruns==1)
		{
			var consoleheight=parseInt($('#jbashWindow').height());
			//log("HIDE CONSOLE "+me.isConsole()+" / "+consoleheight)
			consolepos-=deltatime*640;
			if(consolepos<0-consoleheight)
			{
				consolepos=0-consoleheight;
				m_consoleruns=0;
			}
			$('#jbashWindow').css('top',consolepos+'px');
			//log("HIDE to "+m_mainDisplayID);
			$('#jBashInnerInput').blur();
		}
	}
}

g_gameengine = GE = new GE();
GE.getDeltaTime = function() {return g_gameengine.getDeltaTime();}
GE.tick = function() 
{
	var now = Date.now();
  	g_gameengine.m_deltatime = (now - g_gameengine.m_lastUpdate)*0.001;
    	g_gameengine.m_lastUpdate = now;
    	g_gameengine.UPDATE(g_gameengine.m_deltatime);
    	g_gameengine.RENDER(g_gameengine.m_deltatime);
}

