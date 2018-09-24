import customersReducer from "./customer";

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
const customerData= {
    customers:{
      allIds:["1","2"],
      byId:{
            "1": { customerId: "1",items:["item1_1","item2_1"] 
                },
            "2": { customerId: "2",items:["item1_2","item2_2"]   
                }
          }
      },

    items: {
      allIds:["items1","item2","item3","item4"],
      byId:{
        "item1" :{itemId:"item1_1",customerId:"1", itemName: "Rice",qty:"1",price:'6.60'}, 
        "item2" :{itemId:"item2_1",customerId:"1", itemName: "Bread",qty:"1",price:'2.60'}, 
        "item1" :{itemId:"item1_2",customerId:"2", itemName: "Rice",qty:"3",price:'6.60'}, 
        "item2" :{itemId:"item2_2",customerId:"2", itemName: "Bread",qty:"3",price:'2.60'} 
        }
      }
  };
test("should setup default customer values",() =>{
  
  const state=customersReducer(customerDefaultState,{type:'@@INIT'});
  expect(state).toEqual(customerDefaultState)

});
test("should add customer",()=>{
  const action={type:"ADD_CUSOMTER",customerId:"1"};
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
  const state=customersReducer(customerDefaultState,action);
  const expectedOutput={
      customers:{
        allIds:["1"],
        byId:{
          "1":{customerId:"1",items:[]}
        }
      },
      items:{
        allIds:[],
        byId:{}
      }
  };
  expect(state).toEqual(expectedOutput);
});
test("should add another customer",()=>{
  const action={type:"ADD_CUSOMTER",customerId:"2"};
  const currentState={
      customers:{
        allIds:["1"],
        byId:{
          "1":{customerId:"1",items:[]}
        }
      },
      items:{
        allIds:[],
        byId:{}
      }
  };
  const state=customersReducer(currentState,action);
  const expectedOutput={
      customers:{
        allIds:["1","2"],
        byId:{
          "1":{customerId:"1",items:[]},
          "2":{customerId:"2",items:[]}
        }
      },
      items:{
        allIds:[],
        byId:{}
      }
  };
  expect(state).toEqual(expectedOutput);
});
test("should add item to customer",()=>{
  const action={type:"ADD_ITEM",customerId:"1",item:{itemId: "item1", itemName: "Rice",qty:"1",price:'6.60'}};

  const currentState={
      customers:{
        allIds:["1"],
        byId:{
          "1":{customerId:"1",items:[]}
        }
      },
      items:{
        allIds:[],
        byId:{}
      }
  };
  const state=customersReducer(currentState,action);
  const expectedOutput={
      customers:{
        allIds:["1"],
        byId:{
          "1":{customerId:"1",items:["item1_1"]}
        }
      },
      items:{
        allIds:["item1_1"],
        byId:{
          "item1_1" :{itemId:"item1_1",customerId:"1", itemName: "Rice",qty:"1",price:'6.60'}
        }
      }
  };
  expect(state).toEqual(expectedOutput);
});


test("should add the same item again to customer",()=>{
  const action={type:"ADD_ITEM",customerId:"1",item:{ itemId: "item1", itemName: "Rice",qty:"1",price:'6.60'}};

  const currentState={
      customers:{
        allIds:["1"],
        byId:{
          "1":{customerId:"1",items:["item1_1"]}
        }
      },
      items:{
        allIds:["item1_1"],
        byId:{
          "item1_1" :{itemId:"item1_1",customerId:"1", itemName: "Rice",qty:"1",price:'6.60'}, 
        }
      }
  };
  const state=customersReducer(currentState,action);
  const expectedOutput={
      customers:{
        allIds:["1"],
        byId:{
          "1":{customerId:"1",items:["item1_1"]}
        }
      },
      items:{
        allIds:["item1_1"],
        byId:{
          "item1_1" :{itemId:"item1_1",customerId:"1", itemName: "Rice",qty:"2",price:'6.60'}, 
        }
      }
  };
  expect(state).toEqual(expectedOutput);
});

test("should add another item  to customer",()=>{
  const action={type:"ADD_ITEM",customerId:"1",item:{ itemId: "item2", itemName: "Bread",qty:"1",price:'6.60'}};

  const currentState={
      customers:{
        allIds:["1"],
        byId:{
          "1":{customerId:"1",items:["item1_1"]}
        }
      },
      items:{
        allIds:["item1_1"],
        byId:{
          "item1_1" :{itemId:"item1_1",customerId:"1", itemName: "Rice",qty:"1",price:'6.60'}, 
        }
      }
  };
  const state=customersReducer(currentState,action);
  const expectedOutput={
      customers:{
        allIds:["1"],
        byId:{
          "1":{customerId:"1",items:["item1_1","item2_1"]}
        }
      },
      items:{
        allIds:["item1_1","item2_1"],
        byId:{
          "item1_1" :{itemId:"item1_1",customerId:"1", itemName: "Rice",qty:"1",price:'6.60'}, 
          "item2_1" :{itemId:"item2_1",customerId:"1", itemName: "Bread",qty:"1",price:'6.60'}, 
        }
      }
  };
  expect(state).toEqual(expectedOutput);
});
test("should update item qty to customer",()=>{
  const action={type:"UPDATE_QTY",customerId:"1",item:{itemId:"item1_1", itemName: "Rice",qty:"3",price:'6.60'}};
  const currentState={
      customers:{
        allIds:["1"],
        byId:{
          "1":{customerId:"1",items:["item1_1"]}
        }
      },
      items:{
        allIds:["item1_1"],
        byId:{
          "item1_1" :{itemId:"item1_1",customerId:"1", itemName: "Rice",qty:"1",price:'6.60'}, 
        }
      }
  };
  const state=customersReducer(currentState,action);
  const expectedOutput={
      customers:{
        allIds:["1"],
        byId:{
          "1":{customerId:"1",items:["item1_1"]}
        }
      },
      items:{
        allIds:["item1_1"],
        byId:{
          "item1_1" :{itemId:"item1_1",customerId:"1", itemName: "Rice",qty:"3",price:'6.60'}, 
        }
      }
  };
  expect(state).toEqual(expectedOutput);
});
test("should remove item from customer",()=>{
  const action={type:"REMOVE_ITEM",customerId:"1",item:{itemId:"item1_1", itemName: "Rice",qty:"3",price:'6.60'}};
  const currentState={
      customers:{
        allIds:["1"],
        byId:{
          "1":{customerId:"1",items:["item1_1"]}
        }
      },
      items:{
        allIds:["item1_1"],
        byId:{
          "item1_1" :{itemId:"item1_1",customerId:"1", itemName: "Rice",qty:"1",price:'6.60'}, 
        }
      }
  };
  const state=customersReducer(currentState,action);
  const expectedOutput={
      customers:{
        allIds:["1"],
        byId:{
          "1":{customerId:"1",items:[]}
        }
      },
      items:{
        allIds:[],
        byId:{
        }
      }
  };
  expect(state).toEqual(expectedOutput);
});


test("should update item qty to customer",()=>{
  const action={type:"UPDATE_PRICE",customerId:"1",item:{itemId:"item1_1", itemName: "Rice",qty:"1",price:'2.60'}};

  const currentState={
      customers:{
        allIds:["1"],
        byId:{
          "1":{customerId:"1",items:["item1_1"]}
        }
      },
      items:{
        allIds:["item1_1"],
        byId:{
          "item1_1" :{itemId:"item1_1",customerId:"1", itemName: "Rice",qty:"1",price:'6.60'}, 
        }
      }
  };
  const state=customersReducer(currentState,action);
  const expectedState={
      customers:{
        allIds:["1"],
        byId:{
          "1":{customerId:"1",items:["item1_1"]}
        }
      },
      items:{
        allIds:["item1_1"],
        byId:{
          "item1_1" :{itemId:"item1_1",customerId:"1", itemName: "Rice",qty:"1",price:'2.60'}, 
        }
      }
  };
  expect(state).toEqual(expectedState);
});
test("should remove all items from customer 1",()=>{
  const action={type:"REMOVE_ALL_ITEMS",customerId:"1"};

  const currentState={
      customers:{
        allIds:["1"],
        byId:{
          "1":{customerId:"1",items:["item1_1","item2_1"]}
        }
      },
      items:{
        allIds:["item1_1","item2_1"],
        byId:{
          "item1_1" :{itemId:"item1_1",customerId:"1", itemName: "Rice",qty:"1",price:'6.60'}, 
          "item2_1" :{itemId:"item2_1",customerId:"1", itemName: "Bread",qty:"1",price:'6.60'} 
        }
      }
  };
  const state=customersReducer(currentState,action);
  const expectedState={
      customers:{
        allIds:["1"],
        byId:{
          "1":{customerId:"1",items:[]}
        }
      },
      items:{
        allIds:[],
        byId:{
        }
      }
  };
  expect(state).toEqual(expectedState);
});
test("should remove customer 1 data from customerStore",()=>{
  const action={type:"REMOVE_CUSTOMER",customerId:"1"};

  const currentState={
      customers:{
        allIds:["1"],
        byId:{
          "1":{customerId:"1",items:["item1_1","item2_1"]}
        }
      },
      items:{
        allIds:["item1_1","item2_1"],
        byId:{
          "item1_1" :{itemId:"item1_1",customerId:"1", itemName: "Rice",qty:"1",price:'6.60'}, 
          "item2_1" :{itemId:"item2_1",customerId:"1", itemName: "Bread",qty:"1",price:'6.60'}, 
        }
      }
  };
  const state=customersReducer(currentState,action);
  const expectedState={
      customers:{
        allIds:[],
        byId:{}
      },
      items:{
        allIds:[],
        byId:{}
      }
  }
  expect(state).toEqual(expectedState);
});
test("should remove customer from  customer State",()=>{
  const action={type:"REMOVE_CUSTOMER",customerId:"2"};
  const currentState={
      customers:{
        allIds:["1","2"],
        byId:{
          "1":{customerId:"1",items:["item1_1","item2_1"]},
          "2":{customerId:"2",items:["item1_2","item2_2"]}
        }
      },
      items:{
        allIds:["item1_1","item2_1","item1_2","item2_2"],
        byId:{
          "item1_1" :{itemId:"item1_1",customerId:"1", itemName: "Rice",qty:"1",price:'6.60'}, 
          "item2_1" :{itemId:"item2_1",customerId:"1", itemName: "Bread",qty:"1",price:'6.60'}, 
          "item1_2" :{itemId:"item1_2",customerId:"2", itemName: "Rice",qty:"1",price:'6.60'}, 
          "item2_2" :{itemId:"item2_2",customerId:"2", itemName: "Bread",qty:"1",price:'6.60'} 
        }
      }
  };
  const state=customersReducer(currentState,action);
  const expectedState={
      customers:{
        allIds:["1"],
        byId:{
          "1":{customerId:"1",items:["item1_1","item2_1"]}
        }
      },
      items:{
        allIds:["item1_1","item2_1"],
        byId:{
          "item1_1" :{itemId:"item1_1",customerId:"1", itemName: "Rice",qty:"1",price:'6.60'}, 
          "item2_1" :{itemId:"item2_1",customerId:"1", itemName: "Bread",qty:"1",price:'6.60'} 
        }
      }
  };
  expect(state).toEqual(expectedState);
});
