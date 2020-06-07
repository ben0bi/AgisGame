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

game characters (npcs and player characters)

*/

// character states
var cSTATE_STANDING = 0
var cSTATE_MOVING = 1

var aCharacter = function()
{
	var me = this; // prevent sub functions from getting this-ed.
	// lebenspunkte
	var m_LP = 12; // make hearts, not war. Zelda hearts.
	var m_maxLP = 12; // a heart gets 4 LP.
	this.getLP = function() {return m_LP;}
	this.addLP = function(value) {m_LP+=value;__constrainLP();return m_LP;}
	this.setLP = function(value) {m_LP=value;__constrainLP();return m_LP;}
	var __constrainLP = function()
	{
		if(m_LP>m_maxLP)
			m_LP = m_maxLP;
		if(m_LP<0)
			m_LP = 0;
	}
	
	// x and y position of the player.
	var m_x = 10;
	var m_y = 20;
	var m_w = 64; // width and height of this character
	var m_h = 64;
	
	var m_speed = 250;
	// sprite name
	var m_sprite = "agi";
	// additional classes
	var m_classes = "sprite";
	// direction class
	var m_direction = 5; // extra wrong direction.. ;)
	var m_dirname = -1; // set by m_direction
	this.setDirection=function(dir)
	{
		m_direction = Math.abs(dir);
		if(m_direction>4) // wrong value =
			m_direction=0; // ..standing around.
	}
	// the actual frame of this direction.
	var m_dirFrame = 1;
	var m_frameChange = 0.0; // time until next frame change.
	var m_maxFrameChange = 0.15 // wait so long for next frame change.
	var m_STATE = cSTATE_STANDING; // 0 = standing, 1 = moving
	this.setState=function(newstate) {m_STATE=newstate;}
	// is this a real player which is connected to key or network events?
	this.isRealPlayer = 0; // 0 = npc

	// render the hearts of this player.
	this.RENDERhearts=function()
	{
		var maxhearts=parseInt(m_maxLP*0.25); // heart has 4 states and empty state.
		var fullhearts = parseInt(m_LP*0.25)-1;
		var hx=0;
		for(var i=0;i<maxhearts;i++)
		{	
			var status = "empty";
			if(i<=fullhearts)
			{	status = "full";
			}else{
				if(i>fullhearts && i<=parseInt(m_LP*0.25))
				{
					var q=m_LP%4;
					switch(q)
					{
						case 1: status="f1";break;
						case 2: status="half"; break;
						case 3: status="f3"; break;
						default:
							status="empty";break;
					}
				}
			}
			hx=i*38+4;
			// set new class
			m_myclass = "heart sprite";
			// create element and append it to the screen.
			var elem='<div class="'+m_myclass+' '+status+'" style="top: 4px; left: '+hx+'px;"></div>';
			$(g_gameengine.getActualDisplayID()).append(elem);
		}
	}
	
	// update function
	this.UPDATE = function(deltatime)
	{		
		// maybe get the keys
		if(me.isRealPlayer==1)
		{
			me.setState(cSTATE_STANDING);
			
			// 1 = right
			if(GE.getKeyDown(KEY_LEFT)==0 && GE.getKeyDown(KEY_RIGHT)==1)
			{
				me.setDirection(1)
				me.setState(cSTATE_MOVING);
			} 
			// 3 = left
			if(GE.getKeyDown(KEY_LEFT)==1 && GE.getKeyDown(KEY_RIGHT)==0)
			{
				me.setDirection(3)
				me.setState(cSTATE_MOVING);
			} 
			// 4 = up
			if(GE.getKeyDown(KEY_UP)==1 && GE.getKeyDown(KEY_DOWN)==0)
			{
				me.setDirection(4)
				me.setState(cSTATE_MOVING);
			} 
			// 2 = down
			if(GE.getKeyDown(KEY_UP)==0 && GE.getKeyDown(KEY_DOWN)==1)
			{
				me.setDirection(2)
				me.setState(cSTATE_MOVING);
			}
			
		// Same for WASD	
			// 1 = right
			if(GE.getKeyDown(KEY_A)==0 && GE.getKeyDown(KEY_D)==1)
			{
				me.setDirection(1)
				me.setState(cSTATE_MOVING);
			} 
			// 3 = left
			if(GE.getKeyDown(KEY_A)==1 && GE.getKeyDown(KEY_D)==0)
			{
				me.setDirection(3)
				me.setState(cSTATE_MOVING);
			} 
			// 4 = up
			if(GE.getKeyDown(KEY_W)==1 && GE.getKeyDown(KEY_S)==0)
			{
				me.setDirection(4)
				me.setState(cSTATE_MOVING);
			} 
			// 2 = down
			if(GE.getKeyDown(KEY_W)==0 && GE.getKeyDown(KEY_S)==1)
			{
				me.setDirection(2)
				me.setState(cSTATE_MOVING);
			} 
		}

		// check the state and do something.
		m_frameChange+=deltatime;
		switch(m_STATE)
		{
			case cSTATE_MOVING: //moving
				// animate
				if(m_frameChange >= m_maxFrameChange)
				{
					m_dirFrame+=1
					if(m_dirFrame>3)
						m_dirFrame=1;
				}
				
				// move
				me.move(m_direction, deltatime);
				break;
			case cSTATE_STANDING: // standing
			default:
				m_dirFrame = 3;
				break;
				
		}
		// reset framechange
		if(m_frameChange >= m_maxFrameChange)
			m_frameChange=0;
	}
	
	// move the character in a specific direction.
	this.move = function(direction,deltatime)
	{	
		var dw=g_gameengine.getActualDisplayWidth();
		var dh=g_gameengine.getActualDisplayHeight();
//		log("DW:"+dw+" DH:"+dh);
		var speed = m_speed * deltatime;
		// maybe set state to moving.
		if(m_STATE==cSTATE_STANDING && direction>0)
			m_STATE = cSTATE_MOVING;
			
		switch(direction)
		{		
			case 4:
			case 'u': 
				m_y-=speed;break;
			case 3:
			case 'l':
				m_x-=speed;break;
			case 2:
			case 'd':
				m_y+=speed;break;
			case 1:
			case 'r':
				m_x+=speed;break;
			case 0:
				if(m_STATE==cSTATE_MOVING)
					m_STATE=cSTATE_STANDING;
				// set state to standing
			default: break;
		}
		
		// constrain the character to the display borders.	
		
		// upper left
		if(m_x<=0-(m_w*0.5))
			m_x=0-parseInt(m_w*0.5);
		if(m_y<=0-(m_h*0.5))
			m_y=0-parseInt(m_h*0.5);
		// lower right	TODO: SOMETHING IS WRONG HERE !!!!!!!!!!!!!!!!!!!!!!!!	
		if(m_x+(m_w*0.5)>=dw)
			m_x=parseInt(dw-(m_w*0.5));
		if(m_y+(m_h*0.5)>=dh)
			m_y=parseInt(dh-(m_h*0.5));
	}
	
	// render the character
	this.RENDER=function()
	{
		// translate direction
		switch(m_direction)
		{
			case 4:
			case 'u': m_dirname="up";break;
			case 3:
			case 'l': m_dirname = "left";break;
			case 2:
			case 'd': m_dirname = "down";break;
			case 0:
				m_dirframe=3;
				m_STATE=cSTATE_STANDING;
			case 1:
			case 'r':
				m_direction=1; // set default direction if there is a mess 
				m_dirname="right";break;
			default:
				m_direction=0; // set default direction if there is a mess 
		}
		// set new class
		m_myclass = m_sprite+" "+m_classes+" "+m_dirname+"_"+m_dirFrame;
		// create element and append it to the screen.
		var elem='<div class="'+m_myclass+'" style="top: '+m_y+'px; left: '+m_x+'px;"></div>';
		//log("Rendering to "+g_gameengine.getActualDisplayID());
		$(g_gameengine.getActualDisplayID()).append(elem);
	}
}

