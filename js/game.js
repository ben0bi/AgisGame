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
	var m_Map = null;
	this.getMap=function() {return m_Map;}
	
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
	this.UPDATE = function(deltatime)
	{
		// go through the states and update
		// the editor or game or something.
		switch(m_GAMESTATE)
		{
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
	
		//log("looptick inside game");
		// update the players.							
		for(var i=0;i<m_maxplayers;i++)
		{
			p=m_players[i];
			p.UPDATE(deltatime);
			p.RENDER();
		}
	}
}
