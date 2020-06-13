/*

******************************
*         Agis Game          *
*    A game dedicated to     *
*       Agnaldo Fuhrer       *
*   my best living friend    *
* who's got lost in my sight *
* Hope I'll find him again.  *
******************************
 ___________________________
/                           \
| o        S' GIT         o |
|   Solothurn & Grenchen    |
|       Institutes of       |
| o   gaming Technology   o |
\___________________________/

by Benedict Jäggi 2020

the game in its completeness.

*/

var GAMESTATE_PLAY = 1
var GAMESTATE_MAINMENU = 0
var GAMESTATE_PAUSE = 2
var GAMESTATE_EDITOR = 3

var aGame = function()
{
	var m_players = [];
	var m_maxplayers = 1;
	var m_screen = 0;
	var m_GAMESTATE = GAMESTATE_PLAY;
	
	// the map to play on.
	var m_map = null;
	this.getMap=function() {return m_map;}
	
	// the editor has its own map.
	var m_Editor = null;
	
	// intialize the game.
	this.INIT = function(myscreen)
	{
		m_players = [];
		for(var i = 0;i<m_maxplayers;i++)
		{
			plr = new aCharacter();
			plr.isRealPlayer = 1; //0=npc events, 1=key events, 2=network events
			m_players.push(plr);
		}
		m_screen = myscreen;

		// initialize a blank map.
		m_Map=new aGameMap();		
	}
	
	// the update function gets called each frame.
	var m_old_gamestate=GAMESTATE_MAINMENU;
	this.UPDATE = function(deltatime)
	{
		// switch to pause if console is on.
		if(GE.isConsole()>0 && m_GAMESTATE!=GAMESTATE_PAUSE)
		{
//			log("GAMESTATE PAUSE");
			m_old_gamestate = m_GAMESTATE;
			m_GAMESTATE=GAMESTATE_PAUSE;
		}
		
		// switch to old gamestate if console is off.
		if(GE.isConsole()<=0 && m_GAMESTATE==GAMESTATE_PAUSE)
		{
//			log("GAMESTATE OLD: "+m_old_gamestate);
			m_GAMESTATE=m_old_gamestate;
		}
		
		// go through the states and update
		// the editor or game or something.
		switch(m_GAMESTATE)
		{
			case GAMESTATE_PAUSE:
				break;
			case GAMESTATE_PLAY:
				if(m_Map!=null)
				{
					m_Map.UPDATE(deltatime);
					m_Map.RENDER();
				}
				// show the hearts of the first player.
				if(m_maxplayers>0)
					m_players[0].RENDERhearts();

				break;
			case GAMESTATE_EDITOR:
				if(m_Editor==null)
					m_Editor=new aMapEditor(m_Map);
				// map gets update inside editor.
				m_Editor.UPDATE(deltatime);
				m_Editor.RENDER();
				break;
			default:
				break;
		}

		// maybe show map and render it.
		if(m_map!=null)
		{
			if(m_GAMESTATE==GAMESTATE_PLAY || m_GAMESTATE==GAMESTATE_EDITOR)
				m_map.UPDATE(deltatime);
			m_map.RENDER();
		}
			
		//log("looptick inside game");
		// update the players.							
		for(var i=0;i<m_maxplayers;i++)
		{
			p=m_players[i];
			if(m_GAMESTATE==GAMESTATE_PLAY || m_GAMESTATE==GAMESTATE_EDITOR)
				p.UPDATE(deltatime);
			p.RENDER();
		}
	}
}
