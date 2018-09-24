const itemsDefaultState={
  byId: ["Rice"],
  byName:{
      "1": {id: '1', content: {title: "Rice",qty:1, unitPrice,:6.60}}
  }
};


const listItemsReducer= (state=itemsDefaultState, action) =>{

  switch(action.type){
    case 'ADD_ITEM':{
      return {
        byId:[...state.byId,action.id],
        byName:{
        ...state.byHash,
        [action.id]: action.payload
        }
      };
    }
    case 'UPDATE_ITEM':{
      
        state.byName[action.id]={
          ...state.byName[action.id],
          ...action.payload
        }
      return{
        ...state
      }
    }
    case 'REMOVE_ITEM':{
      const listRemovedId= state.byId.map(item =>{
          return (expense.id!==action.id)
          });
      delete state.byName[action.id];
      return {
        byId: listRemovedId,
        byName:state.byName
      }
    }
    default:
      return state;
    
  }

};

export default listItemsReducer;
