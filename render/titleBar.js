
import i18n from "../i18n.js";

export default function (targetElemId, expectedContent) {
    const titleBarTemplate = /* html */ `       <mdui-top-app-bar class="titlebar_browser">
                                                    <mdui-button-icon icon="menu"></mdui-button-icon>
                                                    <mdui-top-app-bar-title>${expectedContent}</mdui-top-app-bar-title>
                                                    <div style="flex-grow: 1"></div>
                                                    <mdui-button-icon icon="more_vert"></mdui-button-icon>
                                                </mdui-top-app-bar>
                                <div class="titlebar_pwa">
                                    <img src="favicon.png" width="20" height="20" style="padding-left:5px;margin-right:10px" />
                                    <div class="mdui-prose">
                                        <span style="font-size:14px">${expectedContent}</span>
                                    </div>
                                    </label>
                                </div>
                            `;
    document.querySelector("#" + targetElemId).innerHTML = titleBarTemplate;

}