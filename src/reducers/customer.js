
const customerDefaultState={
    customers:{
      allIds:[],
      byId:{}
    },
    items:{
      allIds:[],
      byId:{}
    }
};
// const customerInitialState={
//       "1": { customerId: "1", 
//               items: {
//                   "1" :{iemId:"1", itemName: "Rice",qty:"1",price:'6.60'}, 
//                   "2" :{itemId:"2",itemName: "Bread",qty:"1",price:'2.60'} 
//               }
//           },
//       "2": { customerId: "2", 
//               items: {
//                   "1" :{iemId:"1", itemName: "Rice",qty:"3",price:'6.60'}, 
//                   "2" :{itemId:"2",itemName: "Bread",qty:"2",price:'2.60'} 
//               }
//           }
//       }

var addUpdateItem=function(state,action,update=false){
   const customerItems=state.customers[action.customerId];
   const itemId=(!update)?action.item.itemId+'_'+action.customerId:action.item.itemId;
   const newQty=(state.items.byId[itemId]!==undefined && !update)? (parseInt(state.items.byId[itemId].qty)+parseInt(action.item.qty)).toString(): action.item.qty;
   const newItemList=state.customers.byId[action.customerId].items.concat((state.items.byId[itemId]===undefined)?itemId:[]);
   const newItemAllIds=state.items.allIds.concat((state.items.byId[itemId]===undefined)?itemId:[]);
   const newItem={...action.item,itemId,customerId:action.customerId,qty:newQty};
   return {
   customers:{
             allIds:[...state.customers.allIds],
             byId:{  ...state.customers.byId,
                     [action.customerId]:{ customerId:action.customerId, items:newItemList }
             }
   },
   items:{ 
     allIds:newItemAllIds,
     byId:{...state.items.byId,[itemId]:newItem}
   }
 } ;    
}
var removeItem=function(state,action){
  let newState=Object.assign({},state);
  console.log(newState);
  let newItemsList=newState.customers.byId[action.customerId].items.filter(x =>  x!==action.item.itemId);
  console.log(newItemsList);
  let newItemsAllIds=newState.items.allIds.filter(x =>  x!==action.item.itemId);
  delete newState.items.byId[action.item.itemId];
  return {
    customers:{
            allIds:[...newState.customers.allIds],
            byId:{  ...newState.customers.byId,
                    [action.customerId]:{ customerId:action.customerId, items:newItemsList }
            }
    },
    items:{ 
      allIds:newItemsAllIds,
      byId:{...newState.items.byId}
    }
  } ;    
};
var removeAllItems=function(state,action){
  let newState=Object.assign({},state);
  let newItemsAllIds=[];
  newState.customers.byId[action.customerId].items.forEach(function(itemId) {
    newState.items.allIds=newState.items.allIds.filter(x =>  x!==itemId);
    delete newState.items.byId[itemId];
  });
  while(newState.customers.byId[action.customerId].items.length>0){
    newState.customers.byId[action.customerId].items.pop();
  }
 
  return {
    customers:{
            allIds:[...newState.customers.allIds],
            byId:{  ...newState.customers.byId,
                    [action.customerId]:{ customerId:action.customerId, items:[] }
            }
    },
    items:{ 
      allIds:newState.items.allIds,
      byId:{...newState.items.byId}
    }
  } ;    
  return newState; 
};

var removeCustomer=function(state,action){
  let newState=removeAllItems(state,action);
  delete newState.customers.byId[action.customerId];

  
  return {
    customers:{
            allIds:newState.customers.allIds.filter(x => x!==action.customerId),
            byId:{  ...newState.customers.byId}
    },
    items:{ 
      allIds:newState.items.allIds,
      byId:{...newState.items.byId}
    }
  } ;    
  
};
const customersReducer= (state=customerDefaultState, action) =>{
  switch(action.type){
    case "ADD_CUSOMTER":
    return {
      customers:{
                allIds:[...state.customers.allIds, action.customerId],
                byId:{  ...state.customers.byId,
                        [action.customerId]:{ customerId:action.customerId, items:[] }
                }
      },
      items:{ 
        allIds:[...state.items.allIds],
        byId:{...state.items.byId}
      }
    } ;    
    case "ADD_ITEM":
      return addUpdateItem(state,action);
    case "UPDATE_QTY":
      return addUpdateItem(state,action,true);
    case "REMOVE_ITEM":
      return removeItem(state,action);
    case "UPDATE_PRICE":
      return addUpdateItem(state,action,true);
    case "REMOVE_ALL_ITEMS":
      return removeAllItems(state,action);
    case "REMOVE_CUSTOMER":
      return removeCustomer(state,action);
    default:
      return state;
    
  }

};
export default customersReducer;
