import "react-mosaic-component/react-mosaic-component.css";
import "./style.css";

import { LocaleType, Tools, Univer, UniverInstanceType } from "@univerjs/core";
import { defaultTheme } from "@univerjs/design";
import { UniverDocsPlugin } from "@univerjs/docs";
import { UniverDocsUIPlugin } from "@univerjs/docs-ui";
import { UniverFormulaEnginePlugin } from "@univerjs/engine-formula";
import { UniverRenderEnginePlugin } from "@univerjs/engine-render";
import { UniverSheetsPlugin } from "@univerjs/sheets";
import { UniverSheetsFormulaPlugin } from "@univerjs/sheets-formula";
import { UniverSheetsFormulaUIPlugin } from "@univerjs/sheets-formula-ui";
import { UniverSheetsNumfmtPlugin } from "@univerjs/sheets-numfmt";
import { UniverSheetsUIPlugin } from "@univerjs/sheets-ui";
import { UniverUIPlugin } from "@univerjs/ui";
import ReactDOM from "react-dom";
import { Mosaic, MosaicWindow } from "react-mosaic-component";

/**
 * 
 * The ability to import locales from virtual modules and automatically import styles is provided by Univer Plugins. For more details, please refer to: https://univer.ai/guides/sheet/advanced/univer-plugins.
 * If you encounter issues while using the plugin or have difficulty understanding how to use it, please disable Univer Plugins and manually import the language packs and styles.
 * 
 * 【从虚拟模块导入语言包】以及【自动导入样式】是由 Univer Plugins 提供的能力，详情参考：https://univer.ai/zh-CN/guides/sheet/advanced/univer-plugins
 * 如果您在使用该插件的时候出现了问题，或者无法理解如何使用，请禁用 Univer Plugins，并手动导入语言包和样式
 */ 
import { zhCN, enUS } from 'univer:locales'

import { DEFAULT_WORKBOOK_DATA_DEMO } from "./data";

const univers: Univer[] = [];

function factory(id: string) {
  return function createUniverOnContainer() {
    const univer = new Univer({
      theme: defaultTheme,
      locale: LocaleType.EN_US,
      locales: {
        [LocaleType.ZH_CN]: zhCN,
        [LocaleType.EN_US]: enUS,
      },
    });

    univer.registerPlugin(UniverRenderEnginePlugin);
    univer.registerPlugin(UniverUIPlugin, {
      container: id,
    });
    univer.registerPlugin(UniverDocsPlugin, {
      hasScroll: false,
    });
    univer.registerPlugin(UniverDocsUIPlugin)
    // sheets plugin
    univer.registerPlugin(UniverSheetsPlugin);
    univer.registerPlugin(UniverSheetsUIPlugin);

    // sheet feature plugins
    univer.registerPlugin(UniverSheetsNumfmtPlugin);
    univer.registerPlugin(UniverFormulaEnginePlugin);
    univer.registerPlugin(UniverSheetsFormulaPlugin);
    univer.registerPlugin(UniverSheetsFormulaUIPlugin);
    // create univer sheet instance
    univer.createUnit(UniverInstanceType.UNIVER_SHEET, Tools.deepClone(DEFAULT_WORKBOOK_DATA_DEMO));

    univers.push(univer);
  };
}

const TITLE_MAP: Record<ViewId, string> = {
  a: "Sheet 1",
  b: "Sheet 2",
  c: "Sheet 3",
};

export type ViewId = "a" | "b" | "c";

export const App = (
  <Mosaic<ViewId>
    renderTile={(id, path) => (
      <MosaicWindow<ViewId>
        path={path}
        title={TITLE_MAP[id]}
        toolbarControls={<div />}
      >
        <div id={`app-${id}`} style={{ height: "100%" }}>
          {TITLE_MAP[id]}
        </div>
      </MosaicWindow>
    )}
    initialValue={{
      direction: "row",
      first: "a",
      second: {
        direction: "column",
        first: "b",
        second: "c",
      },
    }}
  />
);

ReactDOM.render(App, document.getElementById("app"));
factory("app-a")();
factory("app-b")();
factory("app-c")();
