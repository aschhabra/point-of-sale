import React from "react";
import {shallow} from "enzyme";
import toJSON from "enzyme-to-json";
import ReactShallowRenderer from "react-test-renderer/shallow";
import {Header} from "./Header";

let startLogout, wrapper;
beforeEach(() => {
  startLogout = jest.fn();
  wrapper = shallow(<Header startLogout={startLogout} />);
});
test ("should render Header Correctly",()=>{
  expect(toJSON(wrapper)).toMatchSnapshot();
//  expect(wrapper.find('h1').text()).toBe("Expensify");

//  const renderer = new ReactShallowRenderer();
//  renderer.render(<Header/>);
//  expect(renderer.getRenderOutput()).toMatchSnapshot();
});

test("should call startLogout on button click",()=>{
  

   wrapper.find("button").simulate("click");
   expect(startLogout).toHaveBeenCalled();
});
