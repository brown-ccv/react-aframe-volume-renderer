
/* globals AFRAME THREE */
import {SystemJS} from 'systemjs';
import * as ImGui from "../imgui-js";


AFRAME.registerComponent('my-imgui-js', {

    init: function () {

        SystemJS.config({
            map: {
              "imgui-js": "https://flyover.github.io/imgui-js"
            },
            packages: {
              "imgui-js": { main: "imgui.js" }
            }
          });
          
          let ImGui;
          let ImGui_Impl;

          var myCanvas = this.el.sceneEl.canvas;
          Promise.resolve().then(() => {
            return import("imgui-js").then((module) => {
              ImGui = module;
              return ImGui.default();
            });
          }).then(() => {
            return import("imgui-js/example/imgui_impl").then((module) => {
              ImGui_Impl = module;
            });
          }).then(() => {
            
            const devicePixelRatio = window.devicePixelRatio || 1;
            //canvas.width = canvas.scrollWidth * devicePixelRatio;
            //canvas.height = canvas.scrollHeight * devicePixelRatio;
            window.addEventListener("resize", () => {
              //const devicePixelRatio = window.devicePixelRatio || 1;
             // canvas.width = canvas.scrollWidth * devicePixelRatio;
             // canvas.height = canvas.scrollHeight * devicePixelRatio;
            });
          
            ImGui.CreateContext();
            ImGui_Impl.Init(myCanvas);
          
            ImGui.StyleColorsDark();
            //ImGui.StyleColorsClassic();
          
            const clear_color = new ImGui.ImVec4(0.3, 0.3, 0.3, 1.00);
          
          
          
            let done = false;
            window.requestAnimationFrame(_loop);
            function _loop(time) {
              ImGui_Impl.NewFrame(time);
              ImGui.NewFrame();
          
              ImGui.SetNextWindowPos(new ImGui.ImVec2(20, 20), ImGui.Cond.FirstUseEver);
              ImGui.SetNextWindowSize(new ImGui.ImVec2(294, 140), ImGui.Cond.FirstUseEver);
              ImGui.Begin("Debug");
              
              ImGui.ColorEdit4("clear color", clear_color);
              ImGui.Separator();
              ImGui.Text(`Scene:`);
              ImGui.Separator();
              ImGui.Text(`Material: HELLO WORLD`);
              //ImGui.ColorEdit3("color", material.color);
              const side_enums = [ THREE.FrontSide, THREE.BackSide, THREE.DoubleSide ];
              const side_names = {};
              side_names[THREE.FrontSide] = "FrontSide";
              side_names[THREE.BackSide] = "BackSide";
              side_names[THREE.DoubleSide] = "DoubleSide"
             /* if (ImGui.BeginCombo("side", side_names[material.side])) {
                side_enums.forEach((side) => {
                  const is_selected = (material.side === side);
                  if (ImGui.Selectable(side_names[side], is_selected)) {
                    material.side = side;
                  }
                  if (is_selected) {
                    ImGui.SetItemDefaultFocus();
                  }
                });
                ImGui.EndCombo();
              }*/
              ImGui.Separator();
              ImGui.Text(`Mesh: `);
              ImGui.Checkbox("visible");
              ImGui.InputText("name" );
              ImGui.SliderFloat3("position");
              ImGui.SliderAngle3("rotation");
              ImGui.SliderFloat3("scale", 0, -2, 2);
          
              ImGui.End();
          
              ImGui.EndFrame();
          
              ImGui.Render();
              
              
          
              ImGui_Impl.RenderDrawData(ImGui.GetDrawData());
          
              window.requestAnimationFrame(done ? _done : _loop);
            }
          
            function _done() {
              ImGui_Impl.Shutdown();
              ImGui.DestroyContext();
            }
          });
          
    }


});