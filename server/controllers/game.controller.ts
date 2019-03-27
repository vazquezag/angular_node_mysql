import {Request, Response} from 'express';
import uniqid from 'uniqid';
import {Game} from '../models/game';

import DaoGames from '../dao/dao.games';

let GameController : any = {};

GameController.getGames = async (req:Request,res:Response)=>{
    let lst:any =await DaoGames.getGames();
    if(lst) res.status(200).json({lst});
    else res.status(200).json({message:"ni ahi perro"});
}
GameController.postGame = async (req:Request, res:Response)=>{
    let params:any = req.body;
    //VALIDA QUE LLEGUEN TODOS LOS PARAMETROS   
    if(params.name && params.description && params.image){
        let newGame = new Game();
        
        newGame.id = uniqid();
        newGame.name = params.name;
        newGame.description = params.description;
        newGame.image = params.image;
        newGame.created_at = undefined;
        
        //validacion que el id sea unica    
        let uniqueID:boolean = false;

        while(!uniqueID){
            uniqueID = DaoGames.IdValid(newGame.id);
        }

        //ID VALIDADADA

        let resInsert = await DaoGames.InsertGame(newGame);

        if(resInsert > 0){
            res.status(200).json({message:"Se inserto correctamente el juego"});
        }
        else{
            res.status(200).json({message:"No se pudo insertar el juego"});
        }
        
    }
    else{
        res.status(400).json({error:"No se enviaron los datos necesarios para registrar un juego"})
    }
    

    
}
export {GameController};