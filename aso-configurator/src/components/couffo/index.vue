<template>
    <div id="aso-frontend-app" class="aso-relative aso-w-full aso-h-[100vh]">

        <div :class="`aso-w-full aso-h-full aso-flex aso-flex-col lg:aso-flex-row-reverse`">
            <div class="aso-w-full lg:aso-w-[92%] aso-h-[54%] lg:aso-h-full aso-flex aso-flex-col">
                <div :class="`aso-w-full aso-h-[9%] lg:aso-h-[10%] aso-bg-[${configColors.backgroundColorHeader}] aso-text-[${configColors.textColorContentHeader}] aso-flex aso-items-center aso-justify-between`">
                    <div v-if="isLoaded" class="aso-w-full aso-h-full aso-flex aso-items-center aso-justify-between aso-px-2">
                        <div class="aso-w-1/5 aso-bg-gradient-to-r aso-from-zinc-400 aso-via-zinc-200 aso-to-zinc-400 aso-p-4 aso-h-[65%] aso-animate-pulse"></div>
                        <div class="aso-w-1/3 aso-h-[65%] aso-flex aso-space-x-4">
                            <div class="aso-w-1/3 aso-bg-gradient-to-r aso-from-zinc-400 aso-via-zinc-200 aso-to-zinc-400 aso-p-4 aso-h-full aso-animate-pulse"></div>
                            <div class="aso-w-1/3 aso-bg-gradient-to-r aso-from-zinc-400 aso-via-zinc-200 aso-to-zinc-400 aso-p-4 aso-h-full aso-animate-pulse"></div>
                            <div class="aso-w-1/3 aso-bg-gradient-to-r aso-from-zinc-400 aso-via-zinc-200 aso-to-zinc-400 aso-p-4 aso-h-full aso-animate-pulse"></div>
                        </div>
                        <div class="aso-w-1/5 aso-bg-gradient-to-r aso-from-zinc-400 aso-via-zinc-200 aso-to-zinc-400 aso-p-4 aso-h-[65%] aso-animate-pulse"></div>
                    </div>
                    
                    <div @click="centerSign(canvas)" v-show="!isLoaded" class="aso-flex aso-w-1/3 aso-justify-center aso-text-base lg:aso-text-2xl aso-font-bold aso-text-center">
                        {{ configVisualiserTexts.titleHeader && configVisualiserTexts.titleHeader.trim() !== '' ? configVisualiserTexts.titleHeader : props.config.name }}
                    </div>
    
                    <div v-show="!isLoaded" class="aso-flex aso-w-1/3 aso-full-center aso-space-x-4">
                        <span @click="confirmResetAll(true)" :class="`aso-w-fit aso-h-fit aso-flex aso-full-center aso-bg-[${configColors.backgroundColorButtonRestartAll}] aso-text-[${configColors.textColorButtonRestartAll}] hover:aso-bg-[${configColors.backgroundColorHoverButtonRestartAll}] hover:aso-text-[${configColors.textColorHoverButtonRestartAll}] aso-space-x-2 aso-p-2 aso-px-3 aso-rounded-full aso-base-animation aso-cursor-pointer`">
                            <svg v-if="configSectionIcons.resetAllIcon === '' " class="aso-h-5 aso-w-5" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="simple-line-icons:reload">
                                <path id="Vector" d="M14.9789 0C7.48448 0 1.38745 6.09744 1.38745 13.5918C1.38745 20.6362 6.81604 26.5274 13.7967 27.1298L11.1056 28.4938C10.7732 28.6762 10.5754 29.0863 10.7723 29.4102L10.8675 29.6563C11.0653 29.9802 11.4937 30.0951 11.8251 29.9136L16.3166 27.6139C16.3223 27.6102 16.3284 27.6112 16.334 27.6074L16.6354 27.4424C16.8018 27.351 16.912 27.2015 16.956 27.0351C17.002 26.8687 16.9809 26.6835 16.882 26.5223L16.7034 26.2293C16.7006 26.2237 16.695 26.2199 16.6917 26.2148L13.9176 21.8798C13.7207 21.5559 13.2932 21.441 12.96 21.6224L12.742 21.7743C12.4096 21.9557 12.3876 22.4245 12.5845 22.7475L14.2214 25.2867C14.2125 25.2862 14.2045 25.2829 14.196 25.2825C8.06477 24.8803 3.26242 19.7442 3.26242 13.5919C3.26245 7.13109 8.51852 1.875 14.9789 1.875C21.4401 1.875 26.7257 7.13109 26.7257 13.5919C26.7257 17.3119 25.0171 20.7286 22.0382 22.966C21.6244 23.2772 21.5409 23.8651 21.8517 24.279C22.163 24.6938 22.7508 24.7763 23.1647 24.4655C26.6199 21.8701 28.6012 17.9068 28.6012 13.5919C28.6007 6.09753 22.4737 0 14.9789 0Z" fill="white"/>
                                </g>
                            </svg>
                            <img v-if="configSectionIcons.resetAllIcon !== '' " :src="configSectionIcons.resetAllIcon" class="aso-w-5 aso-h-5" />                            
                            
                            <div class="aso-hidden lg:aso-flex aso-text-center">
                                {{ configVisualiserTexts.textButtonRefresh && configVisualiserTexts.textButtonRefresh.trim() !== '' ? configVisualiserTexts.textButtonRefresh : 'Reset All' }} 
                            </div>
                        </span>
                            
                        <div class="aso-flex aso-full-center aso-space-x-4">
                            <div class="aso-flex aso-full-center aso-space-x-2">
                                <span @click="undo" :class="`aso-w-fit aso-h-fit aso-flex aso-full-center aso-shadow-[1px_1px_7px_1px_rgba(0,0,0,0.1)] aso-p-2 aso-rounded-full aso-bg-transparent hover:aso-text-[${configColors.textColorContentHeader}]/70 aso-base-animation aso-cursor-pointer`">
                                    <svg v-if="configSectionIcons.cancelAnAction === '' " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-4 aso-h-4 lg:aso-w-5 lg:aso-h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                                    </svg>
                                    <img v-if="configSectionIcons.cancelAnAction !== '' " :src="configSectionIcons.cancelAnAction" class="aso-w-4 aso-h-4 lg:aso-w-5 lg:aso-h-5" />                            
                                </span>
                                <div class="aso-hidden lg:aso-flex aso-text-sm">
                                    {{ configVisualiserTexts.textButtonBack && configVisualiserTexts.textButtonBack.trim() !== '' ? configVisualiserTexts.textButtonBack : 'Undo' }}
                                </div>
                            </div>
    
                            <div class="aso-flex aso-full-center aso-space-x-2">
                                <span @click="redo" :class="`aso-w-fit aso-h-fit aso-flex aso-full-center aso-shadow-[1px_1px_7px_1px_rgba(0,0,0,0.1)] aso-p-2 aso-rounded-full aso-bg-transparent hover:aso-text-[${configColors.textColorContentHeader}]/70 aso-base-animation aso-cursor-pointer`">
                                    <svg v-if="configSectionIcons.icon === '' " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-4 aso-h-4 lg:aso-w-5 lg:aso-h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3" />
                                    </svg>
                                    <img v-if="configSectionIcons.icon !== '' " :src="configSectionIcons.icon" class="aso-w-4 aso-h-4 lg:aso-w-5 lg:aso-h-5" />                            
                                </span>
                                <div class="aso-hidden lg:aso-flex aso-text-sm">
                                    {{ configVisualiserTexts.textButtonNext && configVisualiserTexts.textButtonNext.trim() !== '' ? configVisualiserTexts.textButtonNext : 'Redo' }}
                                </div>
                            </div>
                        </div>
                    </div>
        
                    <div v-show="!isLoaded" class="aso-flex aso-w-1/3 aso-full-center">
                        <div class="aso-bg-white/10 aso-hidden lg:aso-flex aso-full-center aso-space-x-4 aso-p-2 aso-px-4 aso-rounded-lg">
                            <div @click="cloneObject()" :class="`${(activeCanvas !== null && (activeCanvas.getActiveObject() !== undefined && activeCanvas.getActiveObject() !== null)) ? `aso-cursor-pointer` : `aso-cursor-not-allowed` } aso-flex aso-full-center aso-space-x-1 hover:aso-text-[${configColors.textColorContentHeader}]/70 aso-base-animation`">
                                <svg viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg" class="aso-w-5 aso-h-5">
                                    <g clip-path="url(#clip0_65_739)">
                                        <path d="M6 6.5H22V10.5H24V6.5C24 5.96957 23.7893 5.46086 23.4142 5.08579C23.0391 4.71071 22.5304 4.5 22 4.5H6C5.46957 4.5 4.96086 4.71071 4.58579 5.08579C4.21071 5.46086 4 5.96957 4 6.5V22.5C4 23.0304 4.21071 23.5391 4.58579 23.9142C4.96086 24.2893 5.46957 24.5 6 24.5H10V22.5H6V6.5Z" fill="currentColor"/>
                                        <path d="M30 12.5H14C13.4696 12.5 12.9609 12.7107 12.5858 13.0858C12.2107 13.4609 12 13.9696 12 14.5V30.5C12 31.0304 12.2107 31.5391 12.5858 31.9142C12.9609 32.2893 13.4696 32.5 14 32.5H30C30.5304 32.5 31.0391 32.2893 31.4142 31.9142C31.7893 31.5391 32 31.0304 32 30.5V14.5C32 13.9696 31.7893 13.4609 31.4142 13.0858C31.0391 12.7107 30.5304 12.5 30 12.5ZM30 30.5H14V14.5H30V30.5Z" fill="currentColor"/>
                                        <path d="M21 28.5H23V23.5H28V21.5H23V16.5H21V21.5H16V23.5H21V28.5Z" fill="currentColor"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_65_739">
                                            <rect width="36" height="36" fill="none" transform="translate(0 0.5)"/>    
                                        </clipPath>
                                    </defs>
                                </svg>
                                <p class="aso-text-[11px] aso-font-semibold">{{ configVisualiserTexts.textCanvasClone && configVisualiserTexts.textCanvasClone.trim() !== '' ? configVisualiserTexts.textCanvasClone : 'Clone' }}</p>
                            </div>
    
                            <div @click="deleteObject()" :class="`${(activeCanvas !== null && (activeCanvas.getActiveObject() !== undefined && activeCanvas.getActiveObject() !== null)) ? `aso-cursor-pointer` : `aso-cursor-not-allowed` } aso-flex aso-full-center aso-space-x-1 hover:aso-text-[${configColors.textColorContentHeader}]/70 aso-base-animation`">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-5 aso-h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                                <p class="aso-text-[11px] aso-font-semibold">{{ configVisualiserTexts.textCanvasDelete && configVisualiserTexts.textCanvasDelete.trim() !== '' ? configVisualiserTexts.textCanvasDelete : 'Delete' }}</p>
                            </div>
    
                            <div @click="centerVertically()" :class="`${(activeCanvas !== null && (activeCanvas.getActiveObject() !== undefined && activeCanvas.getActiveObject() !== null)) ? `aso-cursor-pointer` : `aso-cursor-not-allowed` } aso-flex aso-full-center aso-space-x-1 hover:aso-text-[${configColors.textColorContentHeader}]/70 aso-base-animation`">
                                <svg focusable="false" viewBox="0 0 24 24" class="aso-w-5 aso-h-5">
                                    <path d="M11 3a1 1 0 1 1 2 0v2.586l1.293-1.293a1 1 0 0 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 1.414-1.414L11 5.586V3zM9.707 19.707a1 1 0 0 1-1.414-1.414l3-3a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1-1.414 1.414L13 18.414V21a1 1 0 1 1-2 0v-2.586l-1.293 1.293zM4 11a1 1 0 1 0 0 2h16a1 1 0 1 0 0-2H4z" fill="currentColor"></path>
                                </svg>
                                <p class="aso-text-[11px] aso-font-semibold">{{ configVisualiserTexts.textCanvasCenterV && configVisualiserTexts.textCanvasCenterV.trim() !== '' ? configVisualiserTexts.textCanvasCenterV : 'CenterV' }}</p>
                            </div>
    
                            <div @click="centerHorizontally()" :class="`${(activeCanvas !== null && (activeCanvas.getActiveObject() !== undefined && activeCanvas.getActiveObject() !== null)) ? `aso-cursor-pointer` : `aso-cursor-not-allowed` } aso-flex aso-full-center aso-space-x-1 hover:aso-text-[${configColors.textColorContentHeader}]/70 aso-base-animation`">
                                <svg focusable="false" viewBox="0 0 24 24" class="aso-w-5 aso-h-5">
                                    <path d="M22 11a1 1 0 1 1 0 2h-3.586l1.293 1.293a1 1 0 0 1-1.414 1.414l-3-3a1 1 0 0 1 0-1.414l3-3a1 1 0 0 1 1.414 1.414L18.414 11H22zM4.293 9.707a1 1 0 0 1 1.414-1.414l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.414-1.414L5.586 13H2a1 1 0 1 1 0-2h3.586L4.293 9.707zM13 4a1 1 0 1 0-2 0v16a1 1 0 1 0 2 0V4z" fill="currentColor"></path>
                                </svg>
                                <p class="aso-text-[11px] aso-font-semibold">{{ configVisualiserTexts.textCanvasCenterH && configVisualiserTexts.textCanvasCenterH.trim() !== '' ? configVisualiserTexts.textCanvasCenterH : 'CenterH' }}</p>
                            </div>
                        </div>
                        
                        <div class="aso-flex lg:aso-hidden aso-text-lg lg:aso-text-3xl aso-font-bold aso-text-center">
                            {{formatPrice(finalPrices)}} 
                            <!-- {{finalPrices}}  --> maxm
                        </div>
                    </div>
                </div>
        
                <div :class="`aso-relative aso-w-full aso-h-[91%] lg:aso-h-[90%] aso-flex aso-flex-col aso-items-center aso-bg-[${configColors.canvasBackgroundColor}]`">
                    <div v-show="configDoublePart.active" class="aso-w-full aso-h-[6%] aso-flex aso-items-center aso-bg-white aso-space-x-3 aso-px-4 aso-border-y">
                        <span class="aso-text-sm aso-font-medium">{{configDoublePart.label}}</span>
    
                        <span @click="flipRect" :class="`aso-mx-2 aso-rounded-full aso-p-1.5 aso-font-medium aso-h-[80%] aso-w-fit aso-bg-[${configColors.backgroundColorHeader}]/30 aso-relative aso-flex aso-justify-between aso-items-center aso-border aso-cursor-pointer`">
                            <span :class="`${activeFace === 'front-face' ? 'aso-left-[3%]' : 'aso-translate-x-[100%] aso-right-[53%]'} aso-bg-[${configColors.backgroundButton}] aso-translate-x aso-absolute aso-w-[50%] aso-h-[90%] aso-transition-all ease-in duration-200 z-0 aso-rounded-full aso-top-[5%]`"></span>
                            
                            <span :class="`${activeFace === 'front-face' ? `aso-text-[${configColors.textColorButton}]` : `aso-text-[${configColors.textColorHoverButton}]`} aso-flex aso-full-center aso-pr-1 aso-z-10`">
                                {{configDoublePart.part1}}
                            </span>
                            <span :class="`${activeFace !== 'front-face' ? `aso-text-[${configColors.textColorButton}]` : `aso-text-[${configColors.textColorHoverButton}]`} aso-flex aso-full-center aso-pl-1 aso-z-10`">
                                {{configDoublePart.part2}}
                            </span>
                        </span>
                    </div>
    
                    <div id="aso-canvas-containers" :class="`flipper aso-relative aso-w-full aso-h-full lg:aso-h-[84%]`">
                        <div v-if="isLoaded" class="aso-absolute aso-top-[50%] aso-left-[50%] aso-translate-x-[-50%] aso-translate-y-[-50%] aso-w-[50%] aso-h-[50%] aso-bg-gradient-to-r aso-from-zinc-400 aso-via-zinc-200 aso-to-zinc-400 aso-p-4 aso-animate-pulse"></div>
    
                        <div id="aso-sign-recto" class="aso-relative aso-w-full aso-h-full">
                            <canvas  ref="canvasFace1Ref" id="canvaas" class="aso-relative aso-w-full aso-h-full"></canvas>
                        </div>
    
                        <div id="aso-sign-verso" class="aso-absolute aso-left-0 aso-top-0">
                            <canvas ref="canvasFace2Ref" class="canvas2 aso-w-full aso-h-full"></canvas>
                        </div>
                    </div>
    
                    <div v-show="!isLoaded">
                        <div id="activeObject-values" class="aso-w-fit aso-invisible aso-absolute aso-top-[2%] aso-left-[50%] aso-translate-x-[-50%] aso-bg-[#828282] aso-text-white aso-text-lg aso-p-2 aso-px-3 aso-rounded-md aso-shadow-md aso-z-10">
                            <div class="aso-space-y-1 aso-text-sm">
                                <div>
                                    <span class="aso-font-semibold">{{ configVisualiserTexts.textSize && configVisualiserTexts.textSize.trim() !== '' ? configVisualiserTexts.textSize : 'Size' }}:</span> {{ configVisualiserTexts.textWidth && configVisualiserTexts.textWidth.trim() !== '' ? configVisualiserTexts.textWidth : 'Width' }}: <span id="text-width"></span> {{configUnit}},  {{ configVisualiserTexts.textHeight && configVisualiserTexts.textHeight.trim() !== '' ? configVisualiserTexts.textHeight : 'Height' }}: <span id="text-height"></span> {{configUnit}}
                                </div>
                                <div>
                                    <span class="aso-font-semibold">{{ configVisualiserTexts.textPosition && configVisualiserTexts.textPosition.trim() !== '' ? configVisualiserTexts.textPosition : 'Position' }}:</span> {{ configVisualiserTexts.textLeft && configVisualiserTexts.textLeft.trim() !== '' ? configVisualiserTexts.textLeft : 'Left' }}: <span id="text-left"></span> {{configUnit}}, {{ configVisualiserTexts.textRight && configVisualiserTexts.textRight.trim() !== '' ? configVisualiserTexts.textRight : 'Right' }}: <span id="text-right"></span> {{configUnit}}, {{ configVisualiserTexts.textTop && configVisualiserTexts.textTop.trim() !== '' ? configVisualiserTexts.textTop : 'Top' }}: <span id="text-top"></span> {{configUnit}}, {{ configVisualiserTexts.textBottom && configVisualiserTexts.textBottom.trim() !== '' ? configVisualiserTexts.textBottom : 'Bottom' }}: <span id="text-bottom"></span> {{configUnit}}
                                </div>
                                <div v-show="angleActive">
                                    <span class="aso-font-semibold">Angle of object:</span> <span id="text-angle"></span>
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <div :class="`aso-absolute aso-bottom-0 aso-w-full aso-h-[10%] aso-bg-[${configColors.backgroundColorHeader}]/10 aso-hidden lg:aso-flex aso-full-center aso-space-x-4`">
                        
                        <div class="aso-w-1/3 aso-flex aso-justify-start aso-items-center aso-space-x-4 aso-px-6">
                            <span @click="showConfigRender()" class="aso-flex aso-cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-4 aso-h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            </span>
                            <!-- <span class="aso-flex">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-4 aso-h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                </svg>
                            </span>
                            <span class="aso-flex">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-4 aso-h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                                </svg>
                            </span>
                            <span class="aso-flex">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="aso-w-4 aso-h-4">
                                    <path d="M7.25012 7.6C7.25012 8.566 8.03412 9.35 9.00012 9.35H15.0001C15.4642 9.35 15.9094 9.16563 16.2376 8.83744C16.5657 8.50925 16.7501 8.06413 16.7501 7.6V4.276C16.7501 4.124 16.8741 4 17.0261 4C17.0983 3.99987 17.1696 4.01536 17.2352 4.04539C17.3008 4.07543 17.3591 4.1193 17.4061 4.174L20.3691 7.629C20.7795 8.10775 20.9938 8.72391 20.9691 9.354L20.6271 18.098C20.6018 18.7434 20.3277 19.3539 19.8622 19.8017C19.3967 20.2495 18.776 20.4997 18.1301 20.5H17.7511C17.6185 20.5 17.4913 20.4473 17.3976 20.3536C17.3038 20.2598 17.2511 20.1326 17.2511 20V15C17.2511 14.5359 17.0667 14.0908 16.7386 13.7626C16.4104 13.4344 15.9653 13.25 15.5011 13.25H8.50112C8.27122 13.2499 8.04355 13.295 7.83112 13.3829C7.61868 13.4708 7.42565 13.5997 7.26304 13.7622C7.10043 13.9247 6.97144 14.1177 6.88343 14.3301C6.79542 14.5425 6.75012 14.7701 6.75012 15V20C6.75012 20.1326 6.69744 20.2598 6.60367 20.3536C6.50991 20.4473 6.38273 20.5 6.25012 20.5H6.11312C5.53116 20.5001 4.96913 20.288 4.53231 19.9034C4.09549 19.5189 3.81384 18.9883 3.74012 18.411C3.24634 14.553 3.22518 10.6491 3.67712 6.786L3.73712 6.266C3.81017 5.64178 4.10993 5.06613 4.57948 4.64839C5.04902 4.23065 5.65564 3.99991 6.28412 4H6.75012C6.88273 4 7.00991 4.05268 7.10367 4.14645C7.19744 4.24022 7.25012 4.36739 7.25012 4.5V7.6Z" fill="currentColor"/>
                                    <path d="M8.25 20C8.25 20.1326 8.30268 20.2598 8.39645 20.3536C8.49021 20.4473 8.61739 20.5 8.75 20.5H15.25C15.3826 20.5 15.5098 20.4473 15.6036 20.3536C15.6973 20.2598 15.75 20.1326 15.75 20V15C15.75 14.9337 15.7237 14.8701 15.6768 14.8232C15.6299 14.7763 15.5663 14.75 15.5 14.75H8.5C8.4337 14.75 8.37011 14.7763 8.32322 14.8232C8.27634 14.8701 8.25 14.9337 8.25 15V20ZM15.25 4.5C15.25 4.36739 15.1973 4.24021 15.1036 4.14645C15.0098 4.05268 14.8826 4 14.75 4H9.25C9.11739 4 8.99021 4.05268 8.89645 4.14645C8.80268 4.24021 8.75 4.36739 8.75 4.5V7.6C8.75 7.738 8.862 7.85 9 7.85H15C15.0663 7.85 15.1299 7.82366 15.1768 7.77678C15.2237 7.72989 15.25 7.6663 15.25 7.6V4.5Z" fill="currentColor"/>
                                </svg>
                            </span> -->
                            <span @click="centerSign(canvas)" class="aso-flex aso-cursor-pointer">
                                <svg viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg" class="aso-w-4 aso-h-4">
                                    <path d="M9.375 9.92967C9.375 9.92967 9.45937 7.93162 11.3402 6.32955C12.457 5.37836 13.7982 5.10287 15 5.08592C16.0975 5.07199 17.0783 5.26392 17.6648 5.55939C18.6674 6.06677 20.625 7.30193 20.625 9.92967C20.625 12.6948 18.9152 13.9482 16.9717 15.3292C15.0281 16.7103 14.5312 18.0647 14.5312 19.6172" stroke="currentColor" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round"/>
                                    <path d="M14.5312 26.1556C15.5668 26.1556 16.4062 25.2882 16.4062 24.2181C16.4062 23.1481 15.5668 22.2806 14.5312 22.2806C13.4957 22.2806 12.6562 23.1481 12.6562 24.2181C12.6562 25.2882 13.4957 26.1556 14.5312 26.1556Z" fill="currentColor"/>
                                </svg>
                            </span>
                        </div>
    
                        <div class="aso-w-2/3 aso-h-full aso-flex aso-justify-end">
                            <div id="aso-price" class="aso-flex aso-full-center aso-space-x-2">
                                <div class="aso-text-center aso-text-lg aso-font-semibold">
                                    {{configVisualiserTexts.textBeforePrice}}
                                </div>
                                <div class="aso-flex aso-text-[#FFBC3C] lg:aso-text-black aso-text-lg lg:aso-text-3xl aso-font-bold aso-text-center">
                                    {{formatPrice(finalPrices)}}
                                    <!-- {{finalPrices}} -->
                                </div>
                                <div class="aso-text-center aso-text-lg aso-font-semibold">
                                    {{configVisualiserTexts.textAfterPrice}}
                                </div>
                            </div>
        
                            <div class="aso-w-1/4 aso-h-full aso-flex aso-justify-end">
                                <div v-show="!isLoaded" @click="finishConfig()" :class="`aso-hidden lg:aso-flex aso-full-center aso-w-[80%] aso-bg-[${configColors.backgroundColorButtonFinish}] aso-text-[${configColors.textColorButtonFinish}] hover:aso-bg-[${configColors.backgroundColorHoverButtonFinish}] hover:aso-text-[${configColors.textColorHoverButtonFinish}] aso-font-semibold aso-p-2 aso-px-3 aso-base-animation aso-cursor-pointer`">
                                    {{ configVisualiserTexts.textButtonFinish && configVisualiserTexts.textButtonFinish.trim() !== '' ? configVisualiserTexts.textButtonFinish : 'Finish' }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
            <div id="aso-optionsButtons-container" :class="`aso-relative aso-w-full aso-h-[8%] lg:aso-w-[8%] lg:aso-h-full aso-p-0 aso-flex aso-flex-col aso-shadow-lg aso-bg-[${configColors.backgroundColorContentSide}]`">
                <div v-if="isLoaded" class="aso-w-full aso-h-full aso-flex aso-flex-col">
                    <div class="aso-h-[90%] aso-flex aso-full-center aso-flex-row aso-space-x-4 lg:aso-space-x-0 lg:aso-flex-col lg:aso-space-y-4 aso-animate-pulse">
                        <div class="aso-w-[50px] lg:aso-w-[80%] aso-bg-gradient-to-r aso-from-zinc-400 aso-via-zinc-200 aso-to-zinc-400 aso-p-4 aso-h-[90%] lg:aso-h-[11%]"></div>
                        <div class="aso-w-[50px] lg:aso-w-[80%] aso-bg-gradient-to-r aso-from-zinc-400 aso-via-zinc-200 aso-to-zinc-400 aso-p-4 aso-h-[90%] lg:aso-h-[11%]"></div>
                        <div class="aso-w-[50px] lg:aso-w-[80%] aso-bg-gradient-to-r aso-from-zinc-400 aso-via-zinc-200 aso-to-zinc-400 aso-p-4 aso-h-[90%] lg:aso-h-[11%]"></div>
                        <div class="aso-w-[50px] lg:aso-w-[80%] aso-bg-gradient-to-r aso-from-zinc-400 aso-via-zinc-200 aso-to-zinc-400 aso-p-4 aso-h-[90%] lg:aso-h-[11%]"></div>
                        <div class="aso-w-[50px] lg:aso-w-[80%] aso-bg-gradient-to-r aso-from-zinc-400 aso-via-zinc-200 aso-to-zinc-400 aso-p-4 aso-h-[90%] lg:aso-h-[11%]"></div>
                    </div>
                </div>
                <!-- <button v-show="!isLoaded" class="aso-hidden lg:aso-flex aso-full-center aso-w-full aso-h-[10%] aso-bg-[#FFBC3C] aso-text-white aso-font-semibold aso-p-2 aso-px-3 aso-base-animation">Terminer</button>
                <div v-show="!isLoaded" class="lg:aso-h-[90%] aso-flex aso-flex-col aso-full-center aso-space-y-4">
                    <div class="aso-flex aso-flex-col aso-full-center aso-space-y-2">
                        <span class="aso-flex aso-full-center aso-rounded-full aso-shadow-[1px_1px_7px_1px_rgba(0,0,0,0.1)] aso-p-2 lg:aso-p-3 aso-bg-white aso-text-black hover:aso-bg-[#016464] hover:aso-text-white aso-base-animation">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-4 aso-h-4 lg:aso-w-5 lg:aso-h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                        </span>
                        <p class="aso-hidden lg:aso-flex aso-text-sm aso-font-medium">Preview</p>
                    </div>
    
                    <div class="aso-flex aso-flex-col aso-full-center aso-space-y-2">
                        <span class="aso-flex aso-full-center aso-rounded-full aso-shadow-[1px_1px_7px_1px_rgba(0,0,0,0.1)] aso-p-2 lg:aso-p-3 aso-bg-white aso-text-black hover:aso-bg-[#016464] hover:aso-text-white aso-base-animation">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-4 aso-h-4 lg:aso-w-5 lg:aso-h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                            </svg>
                        </span>
                        <p class="aso-hidden lg:aso-flex aso-text-sm aso-font-medium">Import</p>
                    </div>
    
                    <div class="aso-flex aso-flex-col aso-full-center aso-space-y-2">
                        <span class="aso-flex aso-full-center aso-rounded-full aso-shadow-[1px_1px_7px_1px_rgba(0,0,0,0.1)] aso-p-2 lg:aso-p-3 aso-bg-white aso-text-black hover:aso-bg-[#016464] hover:aso-text-white aso-base-animation">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-4 aso-h-4 lg:aso-w-5 lg:aso-h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                            </svg>
                        </span>
                        <p class="aso-hidden lg:aso-flex aso-text-sm aso-font-medium">Share</p>
                    </div>
    
                    <div class="aso-flex aso-flex-col aso-full-center aso-space-y-2">
                        <span class="aso-flex aso-full-center aso-rounded-full aso-shadow-[1px_1px_7px_1px_rgba(0,0,0,0.1)] aso-p-2 lg:aso-p-3 aso-bg-white aso-text-black hover:aso-bg-[#016464] hover:aso-text-white aso-base-animation">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="aso-w-4 aso-h-4 lg:aso-w-5 lg:aso-h-5">
                                <path d="M7.25012 7.6C7.25012 8.566 8.03412 9.35 9.00012 9.35H15.0001C15.4642 9.35 15.9094 9.16563 16.2376 8.83744C16.5657 8.50925 16.7501 8.06413 16.7501 7.6V4.276C16.7501 4.124 16.8741 4 17.0261 4C17.0983 3.99987 17.1696 4.01536 17.2352 4.04539C17.3008 4.07543 17.3591 4.1193 17.4061 4.174L20.3691 7.629C20.7795 8.10775 20.9938 8.72391 20.9691 9.354L20.6271 18.098C20.6018 18.7434 20.3277 19.3539 19.8622 19.8017C19.3967 20.2495 18.776 20.4997 18.1301 20.5H17.7511C17.6185 20.5 17.4913 20.4473 17.3976 20.3536C17.3038 20.2598 17.2511 20.1326 17.2511 20V15C17.2511 14.5359 17.0667 14.0908 16.7386 13.7626C16.4104 13.4344 15.9653 13.25 15.5011 13.25H8.50112C8.27122 13.2499 8.04355 13.295 7.83112 13.3829C7.61868 13.4708 7.42565 13.5997 7.26304 13.7622C7.10043 13.9247 6.97144 14.1177 6.88343 14.3301C6.79542 14.5425 6.75012 14.7701 6.75012 15V20C6.75012 20.1326 6.69744 20.2598 6.60367 20.3536C6.50991 20.4473 6.38273 20.5 6.25012 20.5H6.11312C5.53116 20.5001 4.96913 20.288 4.53231 19.9034C4.09549 19.5189 3.81384 18.9883 3.74012 18.411C3.24634 14.553 3.22518 10.6491 3.67712 6.786L3.73712 6.266C3.81017 5.64178 4.10993 5.06613 4.57948 4.64839C5.04902 4.23065 5.65564 3.99991 6.28412 4H6.75012C6.88273 4 7.00991 4.05268 7.10367 4.14645C7.19744 4.24022 7.25012 4.36739 7.25012 4.5V7.6Z" fill="currentColor"/>
                                <path d="M8.25 20C8.25 20.1326 8.30268 20.2598 8.39645 20.3536C8.49021 20.4473 8.61739 20.5 8.75 20.5H15.25C15.3826 20.5 15.5098 20.4473 15.6036 20.3536C15.6973 20.2598 15.75 20.1326 15.75 20V15C15.75 14.9337 15.7237 14.8701 15.6768 14.8232C15.6299 14.7763 15.5663 14.75 15.5 14.75H8.5C8.4337 14.75 8.37011 14.7763 8.32322 14.8232C8.27634 14.8701 8.25 14.9337 8.25 15V20ZM15.25 4.5C15.25 4.36739 15.1973 4.24021 15.1036 4.14645C15.0098 4.05268 14.8826 4 14.75 4H9.25C9.11739 4 8.99021 4.05268 8.89645 4.14645C8.80268 4.24021 8.75 4.36739 8.75 4.5V7.6C8.75 7.738 8.862 7.85 9 7.85H15C15.0663 7.85 15.1299 7.82366 15.1768 7.77678C15.2237 7.72989 15.25 7.6663 15.25 7.6V4.5Z" fill="currentColor"/>
                            </svg>
                        </span>
                        <p class="aso-hidden lg:aso-flex aso-text-sm aso-font-medium">Save </p>
                    </div>
    
                    <div class="aso-flex aso-flex-col aso-full-center aso-space-y-2">
                        <span class="aso-flex aso-full-center aso-rounded-full aso-shadow-[1px_1px_7px_1px_rgba(0,0,0,0.1)] aso-p-2 lg:aso-p-3 aso-bg-[#FFBC3C] aso-text-white hover:aso-bg-[#ffb938] aso-base-animation">
                            <svg viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg" class="aso-w-4 aso-h-4 lg:aso-w-5 lg:aso-h-5">
                                <path d="M9.375 9.92967C9.375 9.92967 9.45937 7.93162 11.3402 6.32955C12.457 5.37836 13.7982 5.10287 15 5.08592C16.0975 5.07199 17.0783 5.26392 17.6648 5.55939C18.6674 6.06677 20.625 7.30193 20.625 9.92967C20.625 12.6948 18.9152 13.9482 16.9717 15.3292C15.0281 16.7103 14.5312 18.0647 14.5312 19.6172" stroke="currentColor" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round"/>
                                <path d="M14.5312 26.1556C15.5668 26.1556 16.4062 25.2882 16.4062 24.2181C16.4062 23.1481 15.5668 22.2806 14.5312 22.2806C13.4957 22.2806 12.6562 23.1481 12.6562 24.2181C12.6562 25.2882 13.4957 26.1556 14.5312 26.1556Z" fill="currentColor"/>
                            </svg>
                        </span>
                        <p class="aso-hidden lg:aso-flex aso-text-sm aso-font-medium">Help</p>
                    </div>
                </div>        -->
    
                <div v-show="!isLoaded" class="aso-w-full aso-h-full aso-flex lg:aso-flex-col aso-items-center lg:aso-space-y-4 aso-py-4 aso-overflow-auto no-scrollbar">
                    <div v-if="allMaterials.length > 1" @click="showOptions('material')" :class="`aso-w-[80%]`">
                        <div :class="`${step === 'material' ? `aso-bg-[${configColors.backgroundColorHoverButton}] aso-text-[${configColors.textColorHoverButton}]` : ``} aso-h-fit aso-flex aso-flex-col aso-full-center aso-space-y-1 aso-bg-[${configColors.backgroundButton}] hover:aso-bg-[${configColors.backgroundColorHoverButton}] aso-text-[${configColors.textColorButton}] hover:aso-text-[${configColors.textColorHoverButton}] aso-px-4 aso-py-1 aso-rounded-lg aso-base-animation aso-cursor-pointer`">
                            <svg  v-if="configSectionIcons.changeIconMaterial === '' " class="aso-w-6 aso-h-6" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="mdi:material">
                                <path id="Vector" d="M4.21671 33.5687L6.45004 34.5254V19.0992L2.40004 29.11C1.71671 30.8525 2.50004 32.8512 4.21671 33.5687ZM36.7167 27.2479L28.45 6.83332C28.2059 6.21413 27.79 5.68187 27.2538 5.30235C26.7177 4.92282 26.0848 4.71268 25.4334 4.69791C25 4.69791 24.55 4.76624 24.1167 4.95416L11.8334 10.1646C11.2405 10.4225 10.7323 10.8492 10.3689 11.3943C10.0056 11.9393 9.80234 12.5797 9.78337 13.2396C9.76671 13.6667 9.85004 14.1621 10 14.6062L18.3334 35.0208C18.8167 36.3533 20.05 37.1391 21.35 37.1562C21.7834 37.1562 22.2167 37.0708 22.6334 36.9L34.9 31.6896C35.7154 31.3473 36.3648 30.6872 36.7055 29.8542C37.0462 29.0213 37.0502 28.0839 36.7167 27.2479ZM13.1334 14.9479C12.6913 14.9479 12.2674 14.7679 11.9549 14.4475C11.6423 14.1272 11.4667 13.6926 11.4667 13.2396C11.4667 12.7865 11.6423 12.352 11.9549 12.0316C12.2674 11.7112 12.6913 11.5312 13.1334 11.5312C14.05 11.5312 14.8 12.3 14.8 13.2396C14.8 14.1792 14.05 14.9479 13.1334 14.9479ZM9.80004 33.7396C9.80004 34.6457 10.1512 35.5148 10.7763 36.1555C11.4015 36.7963 12.2493 37.1562 13.1334 37.1562H15.55L9.80004 22.9087V33.7396Z" fill="currentColor"/>
                                </g>
                            </svg>
                            <img v-if="configSectionIcons.changeIconMaterial !== '' " :src="configSectionIcons.changeIconMaterial" class="aso-w-6 aso-h-6" />
                            <div class="aso-text-[10px] lg:aso-text-[13px] aso-leading-normal aso-font-medium aso-text-center aso-text-nowrap lg:aso-text-wrap">
                                {{configVisualiserTexts.textMaterial}} 
                            </div>
                        </div>
                    </div>
                    
                    <div v-if="materialType == 'advance'" v-for="(component, id) in currentMaterial.data" class="aso-w-[80%]" >
                        <div @click="showOptions('component', component, id)" :class="`${step === 'component' && advancedComponentId === id ? `aso-bg-[${configColors.backgroundColorHoverButton}] aso-text-[${configColors.textColorHoverButton}]` : ``} aso-h-fit aso-flex aso-flex-col aso-full-center aso-space-y-1 aso-bg-[${configColors.backgroundButton}] hover:aso-bg-[${configColors.backgroundColorHoverButton}] aso-text-[${configColors.textColorButton}] hover:aso-text-[${configColors.textColorHoverButton}] aso-px-4 aso-py-1 aso-rounded-lg aso-base-animation aso-cursor-pointer`">
                            <svg v-if="component.icon === '' " class="aso-w-6 aso-h-6" viewBox="0 0 50 50" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <g id="fluent-mdl2:product-release">
                                <path id="Vector" d="M21.875 37.5244V22.8516L6.25 15.0391V36.5234L19.5312 43.1885L18.7744 46.2891L3.125 38.4766V11.5234L23.4375 1.3916L43.75 11.5234V18.1152C42.6107 18.2943 41.569 18.6605 40.625 19.2139V15.0391L25 22.8516V34.3994L21.875 37.5244ZM18.4082 7.37305L32.666 15.5273L38.6963 12.5L23.4375 4.8584L18.4082 7.37305ZM23.4375 20.1416L29.2969 17.2119L15.0391 9.05762L8.17871 12.5L23.4375 20.1416ZM45.1172 21.875C45.8008 21.875 46.4355 21.9971 47.0215 22.2412C47.6074 22.4854 48.1283 22.819 48.584 23.2422C49.0397 23.6654 49.3815 24.1781 49.6094 24.7803C49.8372 25.3825 49.9674 26.0254 50 26.709C50 27.3438 49.8779 27.9622 49.6338 28.5645C49.3896 29.1667 49.0397 29.6956 48.584 30.1514L31.0791 47.6562L21.875 49.9512L24.1699 40.7471L41.6748 23.2666C42.1468 22.7946 42.6758 22.4447 43.2617 22.2168C43.8477 21.9889 44.4661 21.875 45.1172 21.875ZM46.3623 27.9541C46.7041 27.6123 46.875 27.1973 46.875 26.709C46.875 26.2044 46.7122 25.7975 46.3867 25.4883C46.0612 25.179 45.638 25.0163 45.1172 25C44.8893 25 44.6696 25.0326 44.458 25.0977C44.2464 25.1628 44.0592 25.2848 43.8965 25.4639L27.002 42.3584L26.1719 45.6543L29.4678 44.8242L46.3623 27.9541Z" fill="currentColor"/>
                                </g>
                            </svg>
                            <img v-if="component.icon !== '' " :src="component.icon" class="aso-w-6 aso-h-6" />
                            <div class="aso-text-[10px] lg:aso-text-[13px] aso-leading-normal aso-font-medium aso-text-center aso-text-nowrap lg:aso-text-wrap">
                                {{component.name}}
                            </div>
                        </div>
                    </div>
    
                    <div v-if="materialType == 'simple' && (sizees.length > 0 || customSizeActive)" @click="showOptions('size')" :class="`aso-w-[80%]`">
                        <div :class="`${step === 'size' ? `aso-bg-[${configColors.backgroundColorHoverButton}] aso-text-[${configColors.textColorHoverButton}]` : ``} aso-h-fit aso-flex aso-flex-col aso-full-center aso-space-y-1 aso-bg-[${configColors.backgroundButton}] hover:aso-bg-[${configColors.backgroundColorHoverButton}] aso-text-[${configColors.textColorButton}] hover:aso-text-[${configColors.textColorHoverButton}] aso-px-4 aso-py-1 aso-rounded-lg aso-base-animation aso-cursor-pointer`">
                            <svg v-if="configSectionIcons.changeIconSize === '' " class="aso-w-6 aso-h-6" viewBox="0 0 47 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="fluent:keyboard-layout-resize-24-filled">
                                <path id="Vector" d="M41.5083 17.9375C41.8623 17.9375 42.2043 18.0496 42.4711 18.2531C42.7379 18.4566 42.9115 18.7378 42.9596 19.0445L42.9733 19.2187V33.7396C42.9734 34.7135 42.5508 35.6512 41.7908 36.3632C41.0308 37.0751 39.9901 37.5081 38.8791 37.5748L38.5783 37.5833H34.6716C34.3004 37.5832 33.9431 37.4599 33.6719 37.2383C33.4007 37.0167 33.2358 36.7133 33.2105 36.3894C33.1852 36.0655 33.3014 35.7453 33.5356 35.4935C33.7699 35.2417 34.1047 35.077 34.4724 35.0328L34.6716 35.0208H38.5783C38.9323 35.0208 39.2743 34.9087 39.5411 34.7052C39.8079 34.5017 39.9815 34.2206 40.0296 33.9138L40.0433 33.7396V19.2187C40.0433 18.8789 40.1976 18.553 40.4724 18.3128C40.7471 18.0725 41.1197 17.9375 41.5083 17.9375ZM41.5083 3.41666L41.645 3.42178L41.8423 3.45082L41.9751 3.48328L42.0923 3.52257L42.2291 3.58236L42.3892 3.67461L42.5455 3.7942L42.6451 3.88986L42.733 3.99578L42.8307 4.14953L42.8639 4.21274L42.9108 4.32549C42.9323 4.3887 42.9498 4.45532 42.9596 4.52366L42.9733 4.69791V13.2396C42.9732 13.5642 42.8322 13.8767 42.5788 14.1139C42.3254 14.3511 41.9785 14.4953 41.6081 14.5175C41.2378 14.5396 40.8717 14.4379 40.5838 14.2331C40.2958 14.0282 40.1075 13.7354 40.057 13.4138L40.0433 13.2396V7.78999L31.3119 15.4262C31.0501 15.6534 30.7001 15.7858 30.3316 15.7972C29.9631 15.8085 29.6032 15.6979 29.3239 15.4875C29.0445 15.277 28.8662 14.9821 28.8244 14.6617C28.7827 14.3413 28.8807 14.0189 29.0988 13.7589L29.2413 13.6154L37.9688 5.97916H31.7416C31.3876 5.97914 31.0456 5.86702 30.7788 5.66351C30.512 5.46001 30.3384 5.17889 30.2903 4.87216L30.2766 4.69791C30.2766 4.38829 30.4048 4.08916 30.6375 3.85582C30.8702 3.62248 31.1916 3.47072 31.5424 3.42861L31.7416 3.41666H41.5083ZM25.8816 17.9375C26.9953 17.9374 28.0674 18.307 28.8815 18.9717C29.6955 19.6363 30.1906 20.5465 30.2668 21.5182L30.2766 21.7812V33.7396C30.2768 34.7135 29.8541 35.6512 29.0941 36.3632C28.3341 37.0751 27.2935 37.5081 26.1824 37.5748L25.8816 37.5833H8.30162C7.18797 37.5834 6.11579 37.2138 5.30178 36.5492C4.48776 35.8845 3.99261 34.9743 3.91638 34.0027L3.90662 33.7396V21.7812C3.90648 20.8073 4.32911 19.8696 5.0891 19.1577C5.8491 18.4457 6.88977 18.0127 8.0008 17.946L8.30162 17.9375H25.8816ZM20.9983 29.8958H13.1849C12.3841 29.8958 11.7199 30.5279 11.7199 31.1771C11.7199 31.8262 12.2708 32.3627 12.9857 32.4464L13.1849 32.4583H20.9983C21.7991 32.4583 22.4633 31.8262 22.4633 31.1771C22.4633 30.8675 22.3351 30.5683 22.1024 30.335C21.8697 30.1016 21.5483 29.9499 21.1975 29.9078L20.9983 29.8958ZM11.7199 23.0625C11.2019 23.0625 10.7051 23.2425 10.3387 23.5629C9.97241 23.8832 9.76662 24.3177 9.76662 24.7708C9.76662 25.2239 9.97241 25.6584 10.3387 25.9788C10.7051 26.2992 11.2019 26.4792 11.7199 26.4792C12.238 26.4792 12.7348 26.2992 13.1012 25.9788C13.4675 25.6584 13.6733 25.2239 13.6733 24.7708C13.6733 24.3177 13.4675 23.8832 13.1012 23.5629C12.7348 23.2425 12.238 23.0625 11.7199 23.0625ZM22.4633 23.0625C21.9452 23.0625 21.4484 23.2425 21.0821 23.5629C20.7157 23.8832 20.5099 24.3177 20.5099 24.7708C20.5099 25.2239 20.7157 25.6584 21.0821 25.9788C21.4484 26.2992 21.9452 26.4792 22.4633 26.4792C22.9813 26.4792 23.4782 26.2992 23.8445 25.9788C24.2108 25.6584 24.4166 25.2239 24.4166 24.7708C24.4166 24.3177 24.2108 23.8832 23.8445 23.5629C23.4782 23.2425 22.9813 23.0625 22.4633 23.0625ZM17.0916 23.0625C16.5736 23.0625 16.0767 23.2425 15.7104 23.5629C15.3441 23.8832 15.1383 24.3177 15.1383 24.7708C15.1383 25.2239 15.3441 25.6584 15.7104 25.9788C16.0767 26.2992 16.5736 26.4792 17.0916 26.4792C17.6097 26.4792 18.1065 26.2992 18.4728 25.9788C18.8392 25.6584 19.0449 25.2239 19.0449 24.7708C19.0449 24.3177 18.8392 23.8832 18.4728 23.5629C18.1065 23.2425 17.6097 23.0625 17.0916 23.0625ZM24.9049 3.41666C25.2761 3.41676 25.6334 3.54007 25.9046 3.76169C26.1759 3.98331 26.3408 4.28671 26.3661 4.61058C26.3914 4.93445 26.2752 5.25464 26.0409 5.50646C25.8067 5.75828 25.4719 5.92295 25.1042 5.9672L24.9049 5.97916H8.30162C7.9476 5.97917 7.60556 6.0913 7.33876 6.2948C7.07196 6.4983 6.89844 6.77942 6.85029 7.08616L6.83662 7.26041V14.0937C6.8365 14.4184 6.6955 14.7308 6.4421 14.9681C6.18869 15.2053 5.84179 15.3495 5.47147 15.3716C5.10115 15.3937 4.73504 15.2921 4.44711 15.0873C4.15917 14.8824 3.97088 14.5896 3.92029 14.268L3.90662 14.0937V7.26041C3.90648 6.28644 4.32911 5.34875 5.0891 4.63683C5.8491 3.92491 6.88977 3.49186 8.0008 3.4252L8.30162 3.41666H24.9049Z" fill="currentColor"/>
                                </g>
                            </svg>
                            <img v-if="configSectionIcons.changeIconSize !== '' " :src="configSectionIcons.changeIconSize" class="aso-w-6 aso-h-6" />
                            <div class="aso-text-[10px] lg:aso-text-[13px] aso-leading-normal aso-font-medium aso-text-center aso-text-nowrap lg:aso-text-wrap">
                                {{configVisualiserTexts.textSize}}
                            </div>
                        </div>
                    </div>
    
                    <div v-if="shapees.length > 0 && materialType == 'simple'" @click="showOptions('shape')" :class="`aso-w-[80%]`">
                        <div :class="`${step === 'shape' ? `aso-bg-[${configColors.backgroundColorHoverButton}] aso-text-[${configColors.textColorHoverButton}]` : ``} aso-h-fit aso-flex aso-flex-col aso-full-center aso-space-y-1 aso-bg-[${configColors.backgroundButton}] hover:aso-bg-[${configColors.backgroundColorHoverButton}] aso-text-[${configColors.textColorButton}] hover:aso-text-[${configColors.textColorHoverButton}] aso-px-4 aso-py-1 aso-rounded-lg aso-base-animation aso-cursor-pointer`">
                            <svg v-if="configSectionIcons.changeIconShape === '' " class="aso-w-6 aso-h-6" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="mdi:shape">
                                <path id="Vector" d="M18.3333 23.0625V36.7292H5V23.0625H18.3333ZM20 3.41666L29.1667 18.7917H10.8333L20 3.41666ZM29.1667 22.2083C33.3333 22.2083 36.6667 25.625 36.6667 29.8958C36.6667 34.1667 33.3333 37.5833 29.1667 37.5833C25 37.5833 21.6667 34.1667 21.6667 29.8958C21.6667 25.625 25 22.2083 29.1667 22.2083Z" fill="currentColor"/>
                                </g>
                            </svg>
                            <img v-if="configSectionIcons.changeIconShape !== '' " :src="configSectionIcons.changeIconShape" class="aso-w-6 aso-h-6" />
                            <div class="aso-text-[10px] lg:aso-text-[13px] aso-leading-normal aso-font-medium aso-text-center aso-text-nowrap lg:aso-text-wrap">
                                {{configVisualiserTexts.textShape}}
                            </div>
                        </div>
                    </div>
    
                    <div v-if="fixinggs.length > 0" @click="showOptions('fixing-methode')" :class="`aso-w-[80%]`">
                        <div :class="`${step === 'fixing-methode' ? `aso-bg-[${configColors.backgroundColorHoverButton}] aso-text-[${configColors.textColorHoverButton}]` : ``} aso-h-fit aso-flex aso-flex-col aso-full-center aso-space-y-1 aso-bg-[${configColors.backgroundButton}] hover:aso-bg-[${configColors.backgroundColorHoverButton}] aso-text-[${configColors.textColorButton}] hover:aso-text-[${configColors.textColorHoverButton}] aso-px-4 aso-py-1 aso-rounded-lg aso-base-animation aso-cursor-pointer`">
                            <svg v-if="configSectionIcons.changeIconFixingMethod.trim() == '' " class="aso-w-6 aso-h-6" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="uil:screw">
                                <path id="Vector" d="M36.183 16.8667L23.133 3.81666C22.9138 3.59622 22.6374 3.44147 22.3349 3.36988C22.0324 3.29829 21.716 3.31272 21.4212 3.41153C21.1265 3.51035 20.8653 3.68962 20.6671 3.92908C20.4689 4.16855 20.3417 4.45867 20.2997 4.76666L19.083 13.3333L15.7497 16.6667L15.1997 16.35C14.8408 16.1755 14.4313 16.1356 14.0455 16.2374C13.6597 16.3393 13.3232 16.5762 13.0972 16.905C12.8713 17.2339 12.7708 17.6329 12.8141 18.0296C12.8573 18.4263 13.0415 18.7942 13.333 19.0667L11.4163 21.0167L10.8663 20.7C10.5084 20.5356 10.1038 20.5033 9.72429 20.6089C9.3448 20.7144 9.01495 20.9509 8.79324 21.2765C8.57153 21.6021 8.4723 21.9956 8.51314 22.3874C8.55398 22.7792 8.73225 23.1438 9.01634 23.4167L7.06634 25.35L6.53301 25C6.34278 24.8898 6.13264 24.8183 5.91468 24.7897C5.69671 24.761 5.47524 24.7758 5.263 24.8331C5.05077 24.8904 4.85197 24.9892 4.67806 25.1237C4.50415 25.2581 4.35856 25.4257 4.24967 25.6167C4.06145 25.9599 4.00005 26.3584 4.07623 26.7424C4.15242 27.1264 4.36133 27.4713 4.66634 27.7167L3.81634 28.5667C3.662 28.7231 3.5427 28.9106 3.46634 29.1167C3.38094 29.317 3.33564 29.5322 3.33301 29.75V35C3.33301 35.442 3.5086 35.8659 3.82116 36.1785C4.13372 36.4911 4.55765 36.6667 4.99967 36.6667H10.2163C10.4341 36.664 10.6493 36.6187 10.8497 36.5333C11.0557 36.457 11.2432 36.3377 11.3997 36.1833L14.233 33.3333L14.783 33.65C14.9722 33.7609 15.1815 33.8333 15.3988 33.8632C15.6161 33.893 15.8371 33.8797 16.0492 33.824C16.2613 33.7682 16.4604 33.6712 16.6349 33.5384C16.8095 33.4055 16.9561 33.2396 17.0663 33.05C17.2609 32.7069 17.3275 32.3059 17.2543 31.9184C17.181 31.5308 16.9727 31.1818 16.6663 30.9333L18.6163 29L19.1663 29.3167C19.4154 29.4578 19.6967 29.5325 19.983 29.5333C20.302 29.5046 20.606 29.3845 20.8586 29.1875C21.1111 28.9904 21.3016 28.7248 21.4071 28.4223C21.5126 28.1199 21.5287 27.7934 21.4535 27.4821C21.3783 27.1707 21.2149 26.8876 20.983 26.6667L22.933 24.7333L23.483 25.05C23.7321 25.1912 24.0134 25.2658 24.2997 25.2667C24.64 25.2606 24.9704 25.1504 25.2462 24.951C25.5221 24.7516 25.7303 24.4725 25.8429 24.1512C25.9554 23.83 25.9669 23.4819 25.8757 23.154C25.7846 22.826 25.5952 22.5338 25.333 22.3167L26.6497 21L35.233 19.7833C35.5415 19.7395 35.8315 19.6101 36.0701 19.4097C36.3087 19.2094 36.4864 18.9462 36.583 18.65C36.6973 18.3461 36.7203 18.0154 36.6492 17.6986C36.5782 17.3818 36.4161 17.0926 36.183 16.8667ZM9.53301 33.3333H6.66634V30.4667L7.61634 29.5167L11.2497 31.6667L9.53301 33.3333ZM13.683 29.1667L9.99967 27.0833L11.8997 25.1833L15.5163 27.2667L13.683 29.1667ZM18.033 24.8333L14.3997 22.7333L16.3163 20.8333L19.9997 22.9167L18.033 24.8333ZM22.383 20.4833L18.7497 18.3333L20.6497 16.4333L23.5163 19.3L22.383 20.4833ZM26.4663 17.5833L22.4163 13.5333L23.133 8.53333L31.4663 16.8667L26.4663 17.5833Z" fill="currentColor"/>
                                </g>
                            </svg>
                            <img v-if="configSectionIcons.changeIconFixingMethod.trim() != '' " :src="configSectionIcons.changeIconFixingMethod" class="aso-w-6 aso-h-6" />
                            <div class="aso-text-[10px] lg:aso-text-[13px] aso-leading-normal aso-font-medium aso-text-center aso-text-nowrap lg:aso-text-wrap">
                                {{configVisualiserTexts.textFixingMethods}}
                            </div>
                        </div>
                    </div>
    
                    <div v-if="materialType == 'simple'" @click="showOptions('border')" :class="`aso-w-[80%]`">
                        <div :class="`${step === 'border' ? `aso-bg-[${configColors.backgroundColorHoverButton}] aso-text-[${configColors.textColorHoverButton}]` : ``} aso-h-fit aso-flex aso-flex-col aso-full-center aso-space-y-1 aso-bg-[${configColors.backgroundButton}] hover:aso-bg-[${configColors.backgroundColorHoverButton}] aso-text-[${configColors.textColorButton}] hover:aso-text-[${configColors.textColorHoverButton}] aso-px-4 aso-py-1 aso-rounded-lg aso-base-animation aso-cursor-pointer`">
                            <svg v-if="configSectionIcons.changeIconBorder === '' " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6" />
                            </svg>
                            <img v-if="configSectionIcons.changeIconBorder !== '' " :src="configSectionIcons.changeIconBorder" class="aso-w-6 aso-h-6" />
                            <div class="aso-text-[10px] lg:aso-text-[13px] aso-leading-normal aso-font-medium aso-text-center aso-text-nowrap lg:aso-text-wrap">
                                {{configVisualiserTexts.textBorder}}
                            </div>
                        </div>
                    </div>
    
                    <div v-if="materialType == 'simple' || materialType == 'advance'" @click="showOptions('color')" :class="`aso-w-[80%]`">
                        <div :class="`${step === 'color' ? `aso-bg-[${configColors.backgroundColorHoverButton}] aso-text-[${configColors.textColorHoverButton}]` : ``} aso-h-fit aso-flex aso-flex-col aso-full-center aso-space-y-1 aso-bg-[${configColors.backgroundButton}] hover:aso-bg-[${configColors.backgroundColorHoverButton}] aso-text-[${configColors.textColorButton}] hover:aso-text-[${configColors.textColorHoverButton}] aso-px-4 aso-py-1 aso-rounded-lg aso-base-animation aso-cursor-pointer`">
                            <svg v-if="configSectionIcons.changeIconColor === '' " class="aso-w-6 aso-h-6" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="tdesign:fill-color-1">
                                <path id="Vector" d="M20.0004 0.0888367L39.9137 20.5L36.6671 23.8278V23.9167H36.5804L24.7137 36.08C23.4635 37.3611 21.7682 38.0807 20.0004 38.0807C18.2326 38.0807 16.5373 37.3611 15.2871 36.08L4.8004 25.3329C4.18131 24.6983 3.69021 23.945 3.35516 23.1159C3.02011 22.2869 2.84766 21.3983 2.84766 20.5009C2.84766 19.6035 3.02011 18.7149 3.35516 17.8858C3.69021 17.0567 4.18131 16.3034 4.8004 15.6688L12.1971 8.08554L7.64373 3.41667L10.0004 1.00109L14.5554 5.66996L20.0004 0.0888367ZM14.5554 10.5028L7.15873 18.0844C6.50873 18.7507 6.18207 19.6253 6.18207 20.5H35.1987L20.0004 4.92L16.9137 8.08554L22.3571 13.6667L20.0004 16.0823L14.5554 10.5028ZM8.13373 23.9167L17.6437 33.6644C18.2688 34.3049 19.1165 34.6648 20.0004 34.6648C20.8843 34.6648 21.732 34.3049 22.3571 33.6644L31.8671 23.9167H8.13373ZM36.2504 31.4145L38.4404 34.2504C39.4087 35.5043 39.4087 37.4074 38.4404 38.6596C38.1824 39.0048 37.8511 39.2852 37.4717 39.4797C37.0922 39.6741 36.6746 39.7775 36.2504 39.782C35.3671 39.782 34.5837 39.3378 34.0604 38.6596C33.0921 37.4074 33.0921 35.5043 34.0604 34.2504L36.2504 31.4145Z" fill="currentColor"/>
                                </g>
                            </svg>
                            <img v-if="configSectionIcons.changeIconColor !== '' " :src="configSectionIcons.changeIconColor" class="aso-w-6 aso-h-6" />
                            <div class="aso-text-[10px] lg:aso-text-[13px] aso-leading-normal aso-font-medium aso-text-center aso-text-nowrap lg:aso-text-wrap">
                                {{configVisualiserTexts.textColor}}
                            </div>
                        </div>
                    </div>
    
                    <div v-if="(materialType == 'simple' && currentMaterialTextImages.enableText && sizees.length > 0 ) || materialType == 'advance'" @click="showOptions('text')" :class="`aso-w-[80%]`">
                        <div :class="`${step === 'text' ? `aso-bg-[${configColors.backgroundColorHoverButton}] aso-text-[${configColors.textColorHoverButton}]` : ``} aso-h-fit aso-flex aso-flex-col aso-full-center aso-space-y-1 aso-bg-[${configColors.backgroundButton}] hover:aso-bg-[${configColors.backgroundColorHoverButton}] aso-text-[${configColors.textColorButton}] hover:aso-text-[${configColors.textColorHoverButton}] aso-px-4 aso-py-1 aso-rounded-lg aso-base-animation aso-cursor-pointer`">
                            <svg v-if="configSectionIcons.changeIconText === '' " class="aso-w-6 aso-h-6" viewBox="0 0 46 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="clarity:text-line" clip-path="url(#clip0_457_214)">
                                    <path id="Vector" d="M15.5757 11.5411C15.453 11.1569 15.2131 10.8229 14.8912 10.588C14.5693 10.3531 14.1823 10.2296 13.7868 10.2356H13.6335C13.2341 10.226 12.8422 10.3477 12.5156 10.5827C12.189 10.8177 11.9448 11.1537 11.819 11.5411L1.45625 34.6756C1.33756 34.9142 1.27624 35.1782 1.27736 35.4458C1.27736 35.7921 1.41198 36.1242 1.65161 36.369C1.89124 36.6138 2.21625 36.7514 2.55514 36.7514C2.85996 36.7559 3.15822 36.6608 3.40645 36.4799C3.65467 36.2991 3.8399 36.042 3.93514 35.7461L6.59291 29.6753H20.6485L23.3062 35.6678C23.411 35.9742 23.6035 36.2413 23.8587 36.4345C24.1139 36.6278 24.42 36.7381 24.7374 36.7514C25.1034 36.7514 25.4544 36.6028 25.7132 36.3384C25.972 36.074 26.1174 35.7154 26.1174 35.3414C26.102 35.0844 26.0414 34.8323 25.9385 34.5972L15.5757 11.5411ZM7.76847 27.0381L13.6335 13.6953L19.5112 27.0381H7.76847Z" fill="currentColor"/>
                                    <path id="Vector_2" d="M41.1964 19.2961C40.3913 18.568 39.4525 18.0108 38.4346 17.6566C37.4168 17.3025 36.3403 17.1586 35.2676 17.2333C33.1975 17.226 31.1498 17.6711 29.262 18.5389C29.0441 18.6419 28.859 18.8055 28.7279 19.011C28.5969 19.2165 28.5251 19.4556 28.5209 19.7008C28.5451 20.0156 28.6801 20.3107 28.901 20.5315C29.1218 20.7524 29.4135 20.884 29.722 20.9019C29.8926 20.895 30.0609 20.8597 30.2203 20.7975C31.7112 20.0976 33.333 19.7368 34.9737 19.74C38.4237 19.74 40.4426 21.4764 40.4426 24.8578V25.5105C38.6082 24.9643 36.7054 24.696 34.7948 24.7142C30.1437 24.7142 26.9492 26.8161 26.9492 30.7719V30.8372C26.9492 34.6886 30.3992 36.6861 33.8109 36.6861C35.0886 36.7241 36.3568 36.4502 37.5102 35.8871C38.6635 35.324 39.6688 34.488 40.4426 33.4483V35.1194C40.4426 35.4657 40.5772 35.7978 40.8168 36.0426C41.0564 36.2874 41.3814 36.425 41.7203 36.425C41.8948 36.4253 42.0674 36.3891 42.2277 36.3187C42.3879 36.2482 42.5324 36.145 42.6521 36.0153C42.7718 35.8857 42.8643 35.7324 42.9238 35.5648C42.9833 35.3973 43.0086 35.219 42.9981 35.0411V24.8055C43.074 23.8108 42.9536 22.8105 42.6441 21.8641C42.3346 20.9178 41.8423 20.0445 41.1964 19.2961ZM40.4809 29.3489C40.4809 32.3255 37.7081 34.4275 34.3348 34.4275C31.8559 34.4275 29.722 33.0436 29.722 30.6936V30.6153C29.722 28.2653 31.6387 26.6986 35.0887 26.6986C36.9138 26.7039 38.729 26.972 40.4809 27.495V29.3489Z" fill="currentColor"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_457_214">
                                        <rect width="46" height="47" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                            <img v-if="configSectionIcons.changeIconText !== '' " :src="configSectionIcons.changeIconText" class="aso-w-6 aso-h-6" />
                            <div class="aso-text-[10px] lg:aso-text-[13px] aso-leading-normal aso-font-medium aso-text-center aso-text-nowrap lg:aso-text-wrap">
                                {{configVisualiserTexts.textOptionText}}
                            </div>
                        </div>
                    </div>
    
                    <div v-if="(materialType == 'simple' && currentMaterialTextImages.enableImage && sizees.length > 0 ) || materialType == 'advance'" @click="showOptions('image')" :class="`aso-w-[80%]`">
                        <div :class="`${step === 'image' && addComponentId === id ? `aso-bg-[${configColors.backgroundColorHoverButton}] aso-text-[${configColors.textColorHoverButton}]` : ``} aso-h-fit aso-flex aso-flex-col aso-full-center aso-space-y-1 aso-bg-[${configColors.backgroundButton}] hover:aso-bg-[${configColors.backgroundColorHoverButton}] aso-text-[${configColors.textColorButton}] hover:aso-text-[${configColors.textColorHoverButton}] aso-px-4 aso-py-1 aso-rounded-lg aso-base-animation aso-cursor-pointer`">
                            <svg v-if="configSectionIcons.changeIconImage === '' " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                            <img v-if="configSectionIcons.changeIconImage !== '' " :src="configSectionIcons.changeIconImage" class="aso-w-6 aso-h-6" />
                            <div class="aso-text-[10px] lg:aso-text-[13px] aso-leading-normal aso-font-medium aso-text-center aso-text-nowrap lg:aso-text-wrap">
                                {{configVisualiserTexts.textImage}}
                            </div>
                        </div>
                    </div>
    
                    <div v-if="(materialType == 'simple' && additionalComponents.length > 0 )" v-for="(option, id) in additionalComponents" class="aso-w-[80%]" >
                        <div @click="showOptions('add-components', option, id)" :class="`${step === 'add-components' && addComponentId === id ? `aso-bg-[${configColors.backgroundColorHoverButton}] aso-text-[${configColors.textColorHoverButton}]` : ``} aso-h-fit aso-flex aso-flex-col aso-full-center aso-space-y-1 aso-bg-[${configColors.backgroundButton}] hover:aso-bg-[${configColors.backgroundColorHoverButton}] aso-text-[${configColors.textColorButton}] hover:aso-text-[${configColors.textColorHoverButton}] aso-px-4 aso-py-1 aso-rounded-lg aso-base-animation aso-cursor-pointer`">
                            <svg v-if="option.icon === '' " class="aso-w-6 aso-h-6" viewBox="0 0 50 50" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <g id="fluent-mdl2:product-release">
                                <path id="Vector" d="M21.875 37.5244V22.8516L6.25 15.0391V36.5234L19.5312 43.1885L18.7744 46.2891L3.125 38.4766V11.5234L23.4375 1.3916L43.75 11.5234V18.1152C42.6107 18.2943 41.569 18.6605 40.625 19.2139V15.0391L25 22.8516V34.3994L21.875 37.5244ZM18.4082 7.37305L32.666 15.5273L38.6963 12.5L23.4375 4.8584L18.4082 7.37305ZM23.4375 20.1416L29.2969 17.2119L15.0391 9.05762L8.17871 12.5L23.4375 20.1416ZM45.1172 21.875C45.8008 21.875 46.4355 21.9971 47.0215 22.2412C47.6074 22.4854 48.1283 22.819 48.584 23.2422C49.0397 23.6654 49.3815 24.1781 49.6094 24.7803C49.8372 25.3825 49.9674 26.0254 50 26.709C50 27.3438 49.8779 27.9622 49.6338 28.5645C49.3896 29.1667 49.0397 29.6956 48.584 30.1514L31.0791 47.6562L21.875 49.9512L24.1699 40.7471L41.6748 23.2666C42.1468 22.7946 42.6758 22.4447 43.2617 22.2168C43.8477 21.9889 44.4661 21.875 45.1172 21.875ZM46.3623 27.9541C46.7041 27.6123 46.875 27.1973 46.875 26.709C46.875 26.2044 46.7122 25.7975 46.3867 25.4883C46.0612 25.179 45.638 25.0163 45.1172 25C44.8893 25 44.6696 25.0326 44.458 25.0977C44.2464 25.1628 44.0592 25.2848 43.8965 25.4639L27.002 42.3584L26.1719 45.6543L29.4678 44.8242L46.3623 27.9541Z" fill="currentColor"/>
                                </g>
                            </svg>
                            <img v-if="option.icon !== '' " :src="option.icon" class="aso-w-6 aso-h-6" />
                            <div class="aso-text-[10px] lg:aso-text-[13px] aso-leading-normal aso-font-medium aso-text-center aso-text-nowrap lg:aso-text-wrap">
                                {{option.title}}
                            </div>
                        </div>
                    </div>

                    <div v-if="configAdditionnalOptions.length > 0" class="aso-w-[80%]" >
                        <div @click="showOptions('add-options')" :class="`${step === 'add-options' ? `aso-bg-[${configColors.backgroundColorHoverButton}] aso-text-[${configColors.textColorHoverButton}]` : ``} aso-h-fit aso-flex aso-flex-col aso-full-center aso-space-y-1 aso-bg-[${configColors.backgroundButton}] hover:aso-bg-[${configColors.backgroundColorHoverButton}] aso-text-[${configColors.textColorButton}] hover:aso-text-[${configColors.textColorHoverButton}] aso-px-4 aso-py-1 aso-rounded-lg aso-base-animation aso-cursor-pointer`">
                            <svg class="aso-w-6 aso-h-6" viewBox="0 0 50 50" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <g id="fluent-mdl2:product-release">
                                <path id="Vector" d="M21.875 37.5244V22.8516L6.25 15.0391V36.5234L19.5312 43.1885L18.7744 46.2891L3.125 38.4766V11.5234L23.4375 1.3916L43.75 11.5234V18.1152C42.6107 18.2943 41.569 18.6605 40.625 19.2139V15.0391L25 22.8516V34.3994L21.875 37.5244ZM18.4082 7.37305L32.666 15.5273L38.6963 12.5L23.4375 4.8584L18.4082 7.37305ZM23.4375 20.1416L29.2969 17.2119L15.0391 9.05762L8.17871 12.5L23.4375 20.1416ZM45.1172 21.875C45.8008 21.875 46.4355 21.9971 47.0215 22.2412C47.6074 22.4854 48.1283 22.819 48.584 23.2422C49.0397 23.6654 49.3815 24.1781 49.6094 24.7803C49.8372 25.3825 49.9674 26.0254 50 26.709C50 27.3438 49.8779 27.9622 49.6338 28.5645C49.3896 29.1667 49.0397 29.6956 48.584 30.1514L31.0791 47.6562L21.875 49.9512L24.1699 40.7471L41.6748 23.2666C42.1468 22.7946 42.6758 22.4447 43.2617 22.2168C43.8477 21.9889 44.4661 21.875 45.1172 21.875ZM46.3623 27.9541C46.7041 27.6123 46.875 27.1973 46.875 26.709C46.875 26.2044 46.7122 25.7975 46.3867 25.4883C46.0612 25.179 45.638 25.0163 45.1172 25C44.8893 25 44.6696 25.0326 44.458 25.0977C44.2464 25.1628 44.0592 25.2848 43.8965 25.4639L27.002 42.3584L26.1719 45.6543L29.4678 44.8242L46.3623 27.9541Z" fill="currentColor"/>
                                </g>
                            </svg>
                            <div class="aso-text-[10px] lg:aso-text-[13px] aso-leading-normal aso-font-medium aso-text-center aso-text-nowrap lg:aso-text-wrap">
                                {{ configVisualiserTexts.textButtonAdditonnalOptions && configVisualiserTexts.textButtonAdditonnalOptions.trim() !== '' ? configVisualiserTexts.textButtonAdditonnalOptions : 'Add Option' }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
            <div class="aso-w-full aso-h-[32%] lg:aso-w-fit lg:aso-h-fit">
                <div v-show="showOption" id="aso-options-container" :class="`aso-relative lg:aso-absolute lg:aso-left-[8%] lg:aso-top-[11%] aso-w-full lg:aso-w-[35%] aso-h-[85%] lg:aso-h-[70%] aso-bg-[${configColors.backgroundColorOptionsMenu}] aso-text-[${configColors.textColorOptionsMenu}] aso-rounded-md lg:aso-shadow-xl aso-z-20`">
                    <div class="aso-hidden lg:aso-flex aso-absolute aso-top-0 aso-right-0 aso-w-fit aso-h-fit">
                        <span @click="closeOption" :class="`aso-flex aso-bg-[${configColors.backgroundColorHeader}] aso-text-[${configColors.textColorContentHeader}] hover:aso-bg-aso-bg-[${configColors.backgroundColorHeader}]/30 aso-p-1 aso-rounded-md aso-base-animation aso-cursor-pointer aso-z-10`">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="aso-w-5 aso-h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </span>
                    </div>
    
                    <div v-show="step == 'material'" class="aso-relative aso-flex aso-flex-col lg:aso-space-y-3 aso-w-full aso-h-full" id="aso-materials-section">
                        <p :class="`aso-hidden lg:aso-flex aso-bg-[${configColors.backgroundColorHeader}] aso-text-[${configColors.textColorContentHeader}] aso-text-lg aso-font-semibold aso-p-2 aso-px-4`">{{configVisualiserTexts.textMaterial}} </p>    
    
                        <div class="aso-h-full aso-p-2 aso-overflow-auto aso-scrollBar">
                            <div v-for="(material, index) in props.config.data.materials" class="aso-space-y-3">
                                <input type="radio" :id="material.name + index" name="aso-material" class=" peer aso-hidden" @change="selectMaterial(material)">
                                <label :for="material.name + index" :class="`aso-flex aso-full-center aso-space-x-2 aso-cursor-pointer hover:aso-bg-[${configColors.backgroundColorHeader}]/10 aso-p-2 aso-base-animation`">
                                    <div :class="`${material.icon === '' ? `aso-bg-[${configColors.backgroundColorHeader}]` : ``} aso-w-1/4 aso-h-20 aso-flex aso-full-center`">
                                        <img v-if="material.icon != ''" :src="material.icon" class="aso-w-auto aso-h-full" />
                                    </div>                                
                                    <div :class="`aso-w-3/4 aso-flex aso-flex-col aso-space-y-1 aso-text-[${configColors.textColorOptionsMenu}]`">
                                        <p class="aso-text-sm aso-font-medium first-letter:aso-uppercase">{{ material.name }}</p>
                                        <p class="aso-text-xs">{{ material.description }}</p>
                                        <div class="aso-w-full aso-flex aso-items-center aso-justify-between">
                                            <span v-if="material.popImg.trim() != ''" @click="showMaterialExample(true, material.popImg)" :class="`aso-text-xs aso-text-[${configColors.backgroundColorHeader}] aso-underline aso-cursor-pointer`">example</span>
                                            <span v-if="material.popImg.trim() == ''" class="aso-invisible">example</span>                                        
                                            <span :class="`${selectedMaterial == material.name ? `aso-bg-[${configColors.backgroundColorHeader}] aso-text-[${configColors.textColorContentHeader}]` : `aso-text-transparent aso-border-[${configColors.backgroundColorHeader}]`} aso-flex aso-w-fit aso-h-fit aso-p-1 aso-border-solid aso-border-2 aso-rounded-full`">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="4" stroke="currentColor" class="aso-w-4 aso-h-4">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                </svg>
                                            </span>                
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div v-show="showMaterialEx" :class="`aso-absolute aso-top-0 aso-right-0 aso-w-[85%] lg:aso-w-full aso-h-[90%] aso-overflow-auto aso-scrollBar aso-translate-y-[-50%] lg:aso-translate-y-[0%] lg:aso-translate-x-[101%] aso-bg-[${configColors.backgroundColorOptionsMenu}] aso-text-[${configColors.textColorOptionsMenu}] aso-p-2`">
                            <div v-html="materialExample"></div>
                            <div class="aso-absolute aso-top-0 aso-right-0 aso-w-fit aso-h-fit aso-cursor-pointer">
                                <span @click="showMaterialExample(false)" :class="`aso-flex aso-bg-[${configColors.backgroundColorHeader}] aso-text-[${configColors.textColorContentHeader}] hover:aso-bg-aso-bg-[${configColors.backgroundColorHeader}]/30 aso-p-1 aso-base-animation`">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="aso-w-5 aso-h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
    
                    <div v-show="step == 'component'" class="aso-flex aso-flex-col lg:aso-space-y-3 aso-w-full aso-h-full" id="aso-products-section">
                        <p :class="`aso-hidden lg:aso-flex aso-bg-[${configColors.backgroundColorHeader}] aso-text-[${configColors.textColorContentHeader}] aso-text-lg aso-font-semibold aso-p-2 aso-px-4`">{{advancedComponent.name}}</p>    
                        
                        <div class="aso-w-full aso-h-full aso-p-2 aso-overflow-auto aso-scrollBar">
                            <div v-for="(option, index) in advancedComponent.options" class="aso-space-y-3">
                                <input type="radio" :id="'aso-model' + option.name + option.size.width + index" name="aso-advanceModel" class=" peer aso-hidden" @change="selectSignModel(option, index)">
                                <label :for="'aso-model' + option.name + option.size.width + index" :class="`aso-flex aso-full-center aso-space-x-2 hover:aso-bg-[${configColors.backgroundColorHeader}]/10 aso-p-2 aso-base-animation`">
                                    <div :class="`${option.icon === '' ? `aso-bg-[${configColors.backgroundColorHeader}]` : `` } aso-w-1/4 aso-h-20 aso-flex aso-full-center`">
                                        <img v-if="option.icon != ''" :src="option.icon" class="aso-w-auto aso-h-full" />
                                    </div>                                
                                    <div :class="`aso-w-3/4 aso-flex aso-flex-col aso-space-y-1 aso-text-[${configColors.textColorOptionsMenu}]`">
                                        <p class="aso-text-sm aso-font-medium first-letter:aso-uppercase">{{ option.name }}</p>
                                        <p class="aso-text-xs">{{ option.description }}</p>
                                        <p class="aso-text-xs">{{ option.size.width }}x{{ option.size.height }}</p>
                                        <div class="aso-w-full aso-flex aso-items-center aso-justify-between">
                                            <span class="aso-invisible">example</span>
                                            <span :class="`${activeSignModelName == option.name && activeSignModelId === index ? `aso-bg-[${configColors.backgroundColorHeader}] aso-text-[${configColors.textColorContentHeader}]` : `aso-text-transparent aso-border-[${configColors.backgroundColorHeader}]`} aso-flex aso-w-fit aso-h-fit aso-p-1 aso-border-solid aso-border-2 aso-rounded-full`">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="4" stroke="currentColor" class="aso-w-4 aso-h-4">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                </svg>
                                            </span>                
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>

                    </div>
    
                    <div v-show="step == 'size'" class="aso-relative aso-flex aso-flex-col lg:aso-space-y-2 aso-w-full aso-h-full" id="aso-sizes-section">
                        <p :class="`aso-hidden lg:aso-flex aso-bg-[${configColors.backgroundColorHeader}] aso-text-[${configColors.textColorContentHeader}] aso-text-lg aso-font-semibold aso-p-2 aso-px-4`">{{configVisualiserTexts.textSize}}</p>    
                        <div class="aso-h-full aso-space-y-2 aso-p-4 aso-overflow-auto aso-scrollBar">
                            <div class="aso-space-y-2">
                                <div @click="dropSizeToggle()" id="aso-fontSelected-dropdown" :class="`aso-cursor-pointer aso-items-center aso-space-x-3 aso-bg-[${configColors.backgroundButton}] hover:aso-bg-[${configColors.backgroundColorHoverButton}] aso-text-[${configColors.textColorButton}] hover:aso-text-[${configColors.textColorHoverButton}]  aso-px-2 aso-border border-gray-400 aso-rounded-md aso-flex aso-justify-between aso-text-base aso-base-animation`">
                                    <div class="aso-w-fit aso-flex aso-items-center aso-justify-center aso-p-2">
                                        <p v-show="currentSizeName != ''" :class="`lg:aso-text-sm `" >{{ currentSizeName }}</p>
                                        <p v-show="currentSizeName == ''" class="lg:aso-text-sm xl:aso-text-base" >Selected size</p>
                                    </div>
                                    <div class="aso-flex aso-items-center aso-justify-center">
                                        <svg v-show="!showSize" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6 lg:w-5 lg:aso-h-5">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                        <svg v-show="showSize" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6 lg:w-5 lg:aso-h-5">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                        </svg>                                  
                                    </div>
                                </div>
                                <div v-if="showSize" class="aso-flex aso-flex-wrap aso-gap-2 aso-p-1">
                                    <div v-for="(sizee, id) in sizees">
                                        <div class="aso-w-full aso-flex">
                                            <input type="radio" :id="'aso' + sizee.label + sizee.width + index" name="aso-sizes" class=" peer aso-hidden" @click="changeSize({label: sizee.label, width:sizee.width, height:sizee.height}, {textNumber: sizee.textNumber, charPrice: sizee.charPrice, basePrice: sizee.basePrice, maxTextChar: sizee.maxTextChar, startPriceAtChar: sizee.startPriceAtChar}, id )">
                                            <label :for="'aso' + sizee.label + sizee.width + index" :class="`${currentSizeName == sizee.label ? `aso-ring-2 aso-ring-[${configColors.backgroundColorHeader}] aso-text-[${configColors.backgroundColorHeader}]` : `aso-text-[${configColors.textColorOptionsMenu}]`} 
                                                aso-w-full aso-h-full aso-border-solid aso-border aso-justify-center aso-font-semibold aso-text-sm hover:aso-text-[${configColors.backgroundColorHeader}] hover:aso-border-[${configColors.backgroundColorHeader}] aso-rounded-md aso-p-2 aso-text-center aso-cursor-pointer aso-transition-all aso-ease-in-out aso-duration-500`"
                                            >
                                                {{ sizee.label }}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div v-if="currentSizeThickness" class="aso-space-y-2">
                                <p class="aso-text-base aso-font-semibold">{{configVisualiserTexts.thickness}}</p>

                                <div @click="dropThicknessToggle()" id="aso-fontSelected-dropdown" :class="`aso-cursor-pointer aso-items-center aso-space-x-3 aso-bg-[${configColors.backgroundButton}] hover:aso-bg-[${configColors.backgroundColorHoverButton}] aso-text-[${configColors.textColorButton}] hover:aso-text-[${configColors.textColorHoverButton}]  aso-px-2 aso-border border-gray-400 aso-rounded-md aso-flex aso-justify-between aso-text-base aso-base-animation`">
                                    <div class="aso-w-fit aso-flex aso-items-center aso-justify-center aso-p-2">
                                        <p v-show="currentSizeName != ''" :class="`lg:aso-text-sm `" >{{ currentThickValue }} {{configUnit}}</p>
                                        <p v-show="currentSizeName == ''" class="lg:aso-text-sm xl:aso-text-base" >{{configVisualiserTexts.thickness}}</p>
                                    </div>
                                    <div class="aso-flex aso-items-center aso-justify-center">
                                        <svg v-show="!showThick" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6 lg:w-5 lg:aso-h-5">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                        <svg v-show="showThick" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6 lg:w-5 lg:aso-h-5">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                        </svg>                                  
                                    </div>
                                </div>
                                <div v-show="showThick" class="aso-flex aso-flex-wrap aso-gap-2 aso-p-1">
                                    <div v-for="(thick, id) in thicknesss.values">
                                        <div class="aso-w-full aso-flex">
                                            <input type="radio" :id="'aso' + thick + id" name="aso-sizes" class=" peer aso-hidden" @click="selectSizeThickness(thick)">
                                            <label :for="'aso' + thick + id" :class="`${currentThickValue == thick ? `aso-ring-2 aso-ring-[${configColors.backgroundColorHeader}] aso-text-[${configColors.backgroundColorHeader}]` : `aso-text-[${configColors.textColorOptionsMenu}]`} 
                                                aso-w-full aso-h-full aso-border-solid aso-border aso-justify-center aso-font-semibold aso-text-sm hover:aso-text-[${configColors.backgroundColorHeader}] hover:aso-border-[${configColors.backgroundColorHeader}] aso-rounded-md aso-p-2 aso-text-center aso-cursor-pointer aso-transition-all aso-ease-in-out aso-duration-500`"
                                            >
                                                {{ thick }} {{ configUnit }}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div v-if="customSizeActive" class="aso-space-y-2 aso-w-full aso-pb-6">
                                <p class="aso-text-base aso-font-semibold">{{configVisualiserTexts.customSize}}</p>
                                <div class="aso-flex aso-justify-between aso-items-center aso-space-x-2 ">
                                    <div class="aso-w-[47%] aso-flex aso-flex-col aso-space-y-2">
                                        <label :class="`aso-text-xs aso-text-[${configColors.textColorOptionsMenu}]`" for="sizeWidth">{{ customSizes.width.label }} ({{configUnit}})</label>
                                        <input class="aso-p-1 aso-rounded-sm" type="number" name="" id="sizeWidth" :min="customSizes.width.min" :max="customSizes.width.max" v-model="customSizeValues.width">
                                    </div>
                                    <!-- <p class="aso-px-2">x</p> -->
                                    <div class="aso-w-[47%] aso-flex aso-flex-col aso-space-y-2">
                                        <label :class="`aso-text-xs aso-text-[${configColors.textColorOptionsMenu}]`" for="sizeHeight">{{ customSizes.height.label }} ({{configUnit}})</label>
                                        <input class="aso-p-1 aso-rounded-sm" type="number" name="" id="sizeHeight" :min="customSizes.height.min" :max="customSizes.height.max" v-model="customSizeValues.height">
                                    </div>
                                </div>
                                <span @click="changeSize(customSizeValues)" :class="`aso-absolute aso-bottom-0 aso-left-0 aso-w-[97%] aso-flex aso-bg-[${configColors.backgroundButton}] hover:aso-bg-[${configColors.backgroundColorHoverButton}] aso-text-[${configColors.textColorButton}] hover:aso-text-[${configColors.textColorHoverButton}] font-semibold aso-text-md aso-full-center aso-border aso-px-2 aso-p-1 aso-base-animation aso-cursor-pointer`">
                                    {{configVisualiserTexts.customSizeButtonDone}}
                                </span>
                            </div>
                        </div>
                    </div>
    
                    <div v-show="step == 'shape'" class="aso-flex aso-flex-col lg:aso-space-y-2 aso-w-full aso-h-full" id="aso-shapes">
                        <p :class="`aso-hidden lg:aso-flex aso-bg-[${configColors.backgroundColorHeader}] aso-text-[${configColors.textColorContentHeader}] aso-text-lg aso-font-semibold aso-p-2 aso-px-4`">{{configVisualiserTexts.textShape}}</p>    
    
                        <div class="aso-w-full aso-h-full aso-overflow-auto aso-scrollBar">
                            <div class="aso-grid aso-grid-cols-3 lg:aso-grid-cols-3 aso-gap-2 aso-w-full aso-full-center">
                                <div v-for="(shapee, id) in shapees">
                                    <div v-for="(shape, index) in allShapes" :key="shape.name" class="aso-w-full aso-flex">
                                        <div class="aso-w-full aso-flex" v-if="shapee.shapeId == index">
                                            <input type="radio" :id="shape.name + index" name="aso-shape" class="peer aso-hidden" @change="selectShape(shape.value, shapee, id)">
                                            <label :for="shape.name + index" :class="`${selectedShape == shape.value ? `aso-text-[${configColors.backgroundColorHeader}]` : `aso-text-[${configColors.textColorOptionsMenu}]`} 
                                                aso-w-full aso-h-full aso-flex aso-flex-col aso-space-y-1 aso-full-center aso-whitespace-nowrap aso-font-semibold aso-text-sm hover:aso-text-[${configColors.backgroundColorHeader}] aso-rounded-md aso-p-2 aso-text-center aso-cursor-pointer aso-transition-all aso-ease-in-out aso-duration-500`"
                                            >
                                                <div :class="`${shape.icon === '' ? `aso-bg-[${configColors.backgroundColorHeader}]` : ``} aso-w-16 aso-h-16`">
                                                    <img v-if="shape.icon != ''" :src="shape.icon" class="aso-w-full aso-h-full" />
                                                </div>
                                                <p>{{shape.name}}</p>
                                                <p v-if="shapee.additionalPrice > 0" class="aso-text-[11px] aso-leading-normal">({{shapee.additionalPrice}} {{props.currency}})</p>
                                                <p v-if="!shapee.additionalPrice > 0" class="aso-text-[11px] aso-leading-normal aso-invisible">none</p>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <div v-show="step == 'fixing-methode'" class="aso-relative aso-flex aso-flex-col lg:aso-space-y-1 aso-w-full aso-h-full" id="aso-fixings-section">
                        <p :class="`aso-hidden lg:aso-flex aso-bg-[${configColors.backgroundColorHeader}] aso-text-[${configColors.textColorContentHeader}] aso-text-lg aso-font-semibold aso-p-2 aso-px-4`">{{configVisualiserTexts.textFixingMethods}}</p>    
    
                        <div v-if="materialType == 'simple'" class="aso-h-full aso-p-2 aso-overflow-auto aso-scrollBar">
                            <div v-for="(fixingg, id) in fixinggs">
                                <div v-for="(fixing, index) in allFixings">
                                    <div v-if="fixingg.fixingMethodId == index && (!fixingg.excludeShapes.includes(currentShapeId) && !fixingg.excludeSizes.includes(currentSizeId))" class="aso-space-y-3 aso-w-full aso-h-full">
                                        <input type="radio" :id="fixing.name + index" name="aso-fixings" class=" peer aso-hidden" @change="selectFixingMethode(fixing.type, fixingg, id)">
                                        <label :for="fixing.name + index" :class="`aso-flex aso-full-center aso-space-x-2 aso-cursor-pointer hover:aso-bg-[${configColors.backgroundColorHeader}]/10 aso-p-2 aso-base-animation`">
                                            <div :class="`${fixing.icon === '' ? `aso-bg-[${configColors.backgroundColorHeader}]` : `` } aso-w-1/4 aso-h-20 aso-flex aso-full-center`">
                                                <img v-if="fixing.icon != ''" :src="fixing.icon" class="aso-w-auto aso-h-full" />
                                            </div>
                                            <div :class="`aso-w-3/4 aso-flex aso-flex-col aso-space-y-1 aso-text-[${configColors.textColorOptionsMenu}]`">
                                                <p class="aso-text-sm aso-font-medium first-letter:aso-uppercase">{{ fixing.name }} <span v-if="fixingg.additionalPrice > 0" class="aso-text-[11px]">({{ fixingg.additionalPrice }} {{props.currency}})</span> </p>
                                                <p class="aso-text-xs">{{ fixing.description }}</p>
                                                <div class="aso-w-full aso-flex aso-items-center aso-justify-between">
                                                    <span v-if="fixing.popImg.trim() != ''" @click="showFixingExample(true, fixing.popImg)" :class="`aso-text-xs aso-text-[${configColors.backgroundColorHeader}] aso-underline aso-cursor-pointer`">example</span>
                                                    <span v-if="fixing.popImg.trim() == ''" class="aso-invisible">example</span>
                                                    <span :class="`${activeFixingMethode == fixing.type ? `aso-bg-[${configColors.backgroundColorHeader}] aso-text-[${configColors.textColorContentHeader}]` : `aso-text-transparent aso-border-[${configColors.backgroundColorHeader}]`} aso-flex aso-w-fit aso-h-fit aso-p-1 aso-border-solid aso-border-2 aso-rounded-full`">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="4" stroke="currentColor" class="aso-w-4 aso-h-4">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                        </svg>
                                                    </span>                
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-show="showFixingEx" :class="`aso-absolute aso-top-0 aso-right-0 aso-w-[85%] lg:aso-w-full aso-h-[90%] aso-overflow-auto aso-scrollBar aso-translate-y-[-50%] lg:aso-translate-y-[0%] lg:aso-translate-x-[101%] aso-bg-[${configColors.backgroundColorOptionsMenu}] aso-text-[${configColors.textColorOptionsMenu}] aso-p-2`">
                            <div v-html="fixingExample"></div>
                            <div class="aso-absolute aso-top-0 aso-right-0 aso-w-fit aso-h-fit aso-cursor-pointer">
                                <span @click="showFixingExample(false)" :class="`aso-flex aso-bg-[${configColors.backgroundColorHeader}] aso-text-[${configColors.textColorContentHeader}] hover:aso-bg-aso-bg-[${configColors.backgroundColorHeader}]/30 aso-p-1 aso-base-animation`">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="aso-w-5 aso-h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </span>
                            </div>
                        </div>
    
                        <div v-if="materialType == 'advance'" class="aso-h-full aso-p-4 aso-overflow-auto aso-scrollBar">
                            <div v-for="(fixingId) in fixinggs">
                                <div v-for="(fixing, index) in allFixings">
                                    <div v-if="fixingId == index" class="aso-space-y-3">
                                        <input type="radio" :id="fixing.name + index" name="aso-fixings" class=" peer aso-hidden" @change="selectFixingMethode(fixing.type, fixingg)">
                                        <label :for="fixing.name + index" class="aso-flex aso-full-center aso-space-x-2 aso-cursor-pointer">
                                            <div :class="`${fixing.icon === '' ? `aso-bg-[${configColors.backgroundColorHeader}]` : `` } aso-w-1/4 aso-h-20`">
                                                <img v-if="fixing.icon != ''" :src="fixing.icon" class="aso-w-auto aso-h-full" />
                                            </div>
                                            <div :class="`aso-w-3/4 aso-flex aso-flex-col aso-space-y-1 aso-text-[${configColors.textColorOptionsMenu}]`">
                                                <p class="aso-text-sm aso-font-medium first-letter:aso-uppercase">{{ fixing.name }}</p>
                                                <p class="aso-text-xs">{{ fixing.description }}</p>
                                                <div class="aso-w-full aso-flex aso-items-center aso-justify-between">
                                                    <span v-if="fixing.popImg != ''" class="aso-text-xs aso-text-red-500 aso-underline aso-cursor-pointer">example</span>
                                                    <span v-if="fixing.popImg == ''" class="aso-invisible">example</span>
                                                    <span :class="`${activeFixingMethode == fixing.type ? `aso-bg-[${configColors.backgroundColorHeader}] aso-text-[${configColors.textColorContentHeader}]` : `aso-text-transparent`} aso-flex aso-w-fit aso-h-fit aso-p-1 aso-border-2 aso-rounded-full`">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="4" stroke="currentColor" class="aso-w-4 aso-h-4">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                        </svg>
                                                    </span>                
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <div v-show="step == 'color'" class="aso-flex aso-flex-col lg:aso-space-y-3 aso-w-full aso-h-full" id="aso-colors-section">
                        <p :class="`aso-hidden lg:aso-flex aso-bg-[${configColors.backgroundColorHeader}] aso-text-[${configColors.textColorContentHeader}] aso-text-lg aso-font-semibold aso-p-2 aso-px-4`">{{configVisualiserTexts.textColor}}</p>    
    
                        <div v-if="materialType === 'simple'" class="aso-w-full aso-h-full aso-space-y-2 aso-p-3 aso-overflow-auto aso-scrollBar">
                            <div class="aso-flex aso-flex-wrap aso-gap-2 aso-p-1">
                                <div v-for="(colorr, id) in colorrs.allColors" class="aso-flex aso-flex-col aso-full-center aso-space-y-2">
                                    <div v-if="!colorr.pattern.active" @click="changeSignColor(colorr.name, colorr.pattern, colorr.textColor, colorr.additionalPrice)" :class="`${activeFace === 'front-face' && activeSignColor === colorr.name || activeFace === 'back-face' && activeSignFace2Color === colorr.name ? `aso-ring-2 aso-ring-[${configColors.backgroundColorHeader}]` : `` } aso-w-14 aso-h-14 aso-bg-[${colorr.pattern.codeHex}] aso-flex aso-full-center aso-font-bold aso-text-lg aso-text-[${colorr.textColor.codeHex}] aso-rounded-full aso-cursor-pointer aso-overflow-hidden`"> 
                                        <img v-if="colorr.prevImg !== ''" :src="colorr.prevImg" :class="`aso-w-full aso-h-full`" />
                                        <span v-if="colorr.textColor.active">C</span>
                                    </div>
                                    <div v-if="colorr.pattern.active" @click="changeSignColor(colorr.name, colorr.pattern, colorr.textColor, colorr.additionalPrice)" :class="`${activeFace === 'front-face' && activeSignColor === colorr.name || activeFace === 'back-face' && activeSignFace2Color === colorr.name ? `aso-ring-2 aso-ring-[${configColors.backgroundColorHeader}]` : `` } aso-relative aso-w-14 aso-h-14 aso-flex aso-full-center aso-font-bold aso-text-lg aso-text-[${colorr.textColor.codeHex}] aso-rounded-full aso-cursor-pointer aso-overflow-hidden`"> 
                                        <img v-if="colorr.prevImg !== ''" :src="colorr.prevImg" :class="`aso-w-full aso-h-full`" />
                                        <img v-if="colorr.prevImg === ''" :src="colorr.pattern.url" :class="`aso-w-full aso-h-full`" />
                                        <span v-if="colorr.textColor.active" :class="`aso-absolute aso-top-[50%] aso-translate-y-[-50%] aso-left-[50%] aso-translate-x-[-50%]`">C</span>
                                    </div>
    
                                    <p class="aso-text-sm">{{colorr.name }}</p>
                                    <p v-if="colorr.additionalPrice > 0" class="aso-text-[11px] aso-leading-normal">({{colorr.additionalPrice}} {{props.currency}})</p>
                                    <p v-if="!colorr.additionalPrice > 0" class="aso-text-[11px] aso-leading-normal aso-invisible">none</p>
                                </div>
                            </div>
                            <div v-if="colorrs.customColors.active" :class="`aso-flex aso-flex-col aso-space-y-2`">
                                <p class="aso-font-medium">{{colorrs.customColors.label}}</p>
                                <div :class="`aso-relative aso-w-fit`">
                                    <input id="aso-setSignColor" type="color" v-model="simpleColor" class="aso-invisible aso-w-0 aso-h-0 aso-absolute aso-top-[30%] aso-left-[30%]" @input="changeSignColor(colorrs.customColors.label, {active: false, codeHex: simpleColor, url: ''}, {active: false, codeHex: '', sameForBorder: false}, 0)"/>
                                    <label for="aso-setSignColor" :class="`${activeSignColor == colorrs.customColors.label ? `aso-ring-2 aso-ring-[${configColors.backgroundColorHeader}]` : `` } aso-w-14 aso-h-14 aso-flex aso-full-center aso-rounded-full aso-overflow-hidden`">
                                        <svg v-if="colorrs.customColors.prevImg === ''" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" class="aso-w-full aso-h-full">
                                            <g fill="none" fill-rule="evenodd">
                                                <path d="M22.015.061H.95a.866.866 0 0 0-.614.256l21.68 21.68V.061z" fill="#CE1128"></path>
                                                <path d="M.335.317A.867.867 0 0 0 .08.93v21.066h21.935L.335.317z" fill="#ED2E8A"></path>
                                                <path d="M43.696.317a.866.866 0 0 0-.614-.256H22.015v21.936L43.695.317z" fill="#F99410"></path>
                                                <path d="M43.696 43.678a.866.866 0 0 0 .255-.614V21.997H22.015l21.68 21.68z" fill="#20B718"></path>
                                                <path d="M43.696.317l-21.68 21.68H43.95V.931a.867.867 0 0 0-.255-.614" fill="#FCEA10"></path>
                                                <path d="M22.015 43.933h21.067a.87.87 0 0 0 .614-.255l-21.68-21.68v21.935z" fill="#2CB1E5"></path>
                                                <path d="M.08 21.997v21.067c0 .239.097.456.255.614l21.68-21.68H.08z" fill="#662483"></path>
                                                <path d="M.335 43.678a.867.867 0 0 0 .614.255h21.066V21.997L.335 43.677z" fill="#126EB2"></path>
                                            </g>
                                        </svg>
                                        <img v-if="colorrs.customColors.prevImg !== ''" class="aso-w-full aso-h-full"/>
                                    </label>
                                </div>
                            </div>
                        </div>
    
                        <div v-if="materialType === 'advance'" class="aso-w-full aso-h-full aso-p-3 aso-overflow-auto aso-scrollBar">
                            <div class="aso-flex aso-flex-wrap aso-gap-2 aso-p-1">
                                <div v-for="(colorr, id) in colorrs" class="aso-flex aso-flex-col aso-space-y-2 aso-full-center">
                                    <div class="aso-w-16 aso-h-16 aso-rounded-full aso-overflow-hidden">
                                        <img :src="colorr.image" class="aso-w-full aso-h-full" />
                                    </div>
                                    <p class="aso-text-sm">{{colorr.color.name}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <div v-show="step == 'border'" class="aso-flex aso-flex-col aso-w-full aso-h-full" id="aso-borders-section">
                        <p :class="`aso-hidden lg:aso-flex aso-bg-[${configColors.backgroundColorHeader}] aso-text-[${configColors.textColorContentHeader}] aso-text-lg aso-font-semibold aso-p-2 aso-px-4`">{{configVisualiserTexts.textBorder}}</p>    
    
                        <div class="aso-h-full aso-p-2 aso-overflow-auto aso-scrollBar">
                            <div class="aso-flex aso-flex-wrap aso-gap-2 aso-p-1">
                                <div v-if="activeFace === 'front-face'" v-for="(borderr, id) in borderrs.allBorders">
                                    <div v-for="(border, index) in allBorders" :key="border.name" class="aso-w-full aso-flex">
                                        <div v-if="borderr.manageBorderId == index && (!borderr.excludeShapes.includes(currentShapeId) && !borderr.excludeSizes.includes(currentSizeId))">
                                            <input type="radio" :id="'border' + border.name + index + 'face1'" name="aso-borders-face1" class="peer aso-hidden" @input="selectBorder(border.value, borderr.settings, borderr.additionalPrice, borderr.excludeShapes, borderr.excludeSizes, id)">
                                            <label :for="'border' + border.name + index + 'face1'" :class="`${activeFace === 'front-face' && activeFace1Border === border.value ? `aso-text-[${configColors.backgroundColorHeader}]` : `aso-text-[${configColors.textColorOptionsMenu}]`} 
                                                aso-w-full aso-h-full aso-flex aso-flex-col aso-space-y-1 aso-full-center aso-font-semibold aso-text-sm hover:aso-text-[${configColors.backgroundColorHeader}] aso-rounded-md aso-p-2 aso-text-center aso-cursor-pointer aso-transition-all aso-ease-in-out aso-duration-500`"
                                            >
                                                <div :class="`${border.icon != '' ? `` : `aso-bg-[${configColors.backgroundColorHeader}]`} aso-w-14 aso-h-14`">
                                                    <img v-if="border.icon != ''" :src="border.icon" class="aso-w-full aso-h-full" />
                                                </div>
                                                <p>{{border.name}}</p>
                                                <p v-if="borderr.additionalPrice > 0" class="aso-text-[11px] aso-leading-normal">({{borderr.additionalPrice}} {{props.currency}})</p>
                                                <p v-if="!borderr.additionalPrice > 0" class="aso-text-[11px] aso-leading-normal aso-invisible">none</p>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="activeFace === 'back-face'" v-for="(borderr, id) in borderrs.allBorders">
                                    <div v-for="(border, index) in allBorders" :key="border.name" class="aso-w-full aso-flex">
                                        <div v-if="borderr.manageBorderId == index && (!borderr.excludeShapes.includes(currentShapeId) && !borderr.excludeSizes.includes(currentSizeId))">
                                            <input type="radio" :id="'border' + border.name + index + 'face2'" name="aso-borders-face2" class="peer aso-hidden" @change="selectBorder(border.value, borderr.settings, borderr.additionalPrice, borderr.excludeShapes, borderr.excludeSizes, id)">
                                            <label :for="'border' + border.name + index + 'face2'" :class="`${activeFace === 'back-face' && activeFace2Border === border.value ? `aso-text-[${configColors.backgroundColorHeader}]` : `aso-text-[${configColors.textColorOptionsMenu}]`} 
                                                aso-w-full aso-h-full aso-flex aso-flex-col aso-space-y-1 aso-full-center aso-font-semibold aso-text-sm hover:aso-text-[${configColors.backgroundColorHeader}] aso-rounded-md aso-p-2 aso-text-center aso-cursor-pointer aso-transition-all aso-ease-in-out aso-duration-500`"
                                            >
                                                <div :class="`${border.icon != '' ? `` : `aso-bg-[${configColors.backgroundColorHeader}]`} aso-w-14 aso-h-14`">
                                                    <img v-if="border.icon != ''" :src="border.icon" class="aso-w-full aso-h-full" />
                                                </div>
                                                <p>{{border.name}}</p>
                                                <p v-if="borderr.additionalPrice > 0" class="aso-text-[11px] aso-leading-normal">({{borderr.additionalPrice}} {{props.currency}})</p>
                                                <p v-if="!borderr.additionalPrice > 0" class="aso-text-[11px] aso-leading-normal aso-invisible">none</p>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
    
                            <div v-if="(colorForBorder1 && activeFace === 'front-face' && borderColors1.length > 0) || (colorForBorder2 && activeFace === 'back-face' && borderColors2.length > 0)" class="aso-p-2">
                                <p class="aso-font-medium">Colors</p>
                                <div v-if="activeFace === 'front-face'">
                                    <div class="aso-flex aso-flex-wrap aso-gap-2 aso-p-1">
                                        <div v-for="(color, index) in borderColors1" class="aso-flex aso-flex-col aso-full-center aso-space-y-2">
                                            <div @click="changeBorderColor(color.codeHex, color.additionalPrice)" :class="`${activeFace1BorderColor === color.codeHex ? `aso-ring-2 aso-ring-[${configColors.backgroundColorHeader}]` : ``} aso-w-12 aso-h-12 aso-bg-[${color.codeHex}] aso-flex aso-full-center aso-font-bold aso-text-lg aso-rounded-full aso-cursor-pointer`"></div>           
                                            <p class="aso-text-xs">{{color.name}}</p>
                                            <p v-if="color.additionalPrice > 0" class="aso-text-[10px] aso-leading-normal">({{color.additionalPrice}} {{props.currency}})</p>
                                            <p v-if="!color.additionalPrice > 0" class="aso-text-[10px] aso-leading-normal aso-invisible">none</p>
                                        </div>
                                        <div :class="`aso-relative`">
                                            <input id="aso-setBorderColor1" type="color" v-model="borderCustomColor1" class="aso-invisible aso-w-0 aso-h-0 aso-absolute aso-top-[30%] aso-left-[30%]" @input="changeBorderColor($event.target.value , 0)" />
                                            <label for="aso-setBorderColor1" v-if="customBorderColor1" :class="`${activeSignColor == 'custom' ? `aso-ring-2 aso-ring-[${configColors.backgroundColorHeader}]` : `` } aso-w-12 aso-h-12 aso-flex aso-full-center aso-rounded-full aso-overflow-hidden`">
                                                <svg viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" class="aso-w-full aso-h-full">
                                                    <g fill="none" fill-rule="evenodd">
                                                        <path d="M22.015.061H.95a.866.866 0 0 0-.614.256l21.68 21.68V.061z" fill="#CE1128"></path>
                                                        <path d="M.335.317A.867.867 0 0 0 .08.93v21.066h21.935L.335.317z" fill="#ED2E8A"></path>
                                                        <path d="M43.696.317a.866.866 0 0 0-.614-.256H22.015v21.936L43.695.317z" fill="#F99410"></path>
                                                        <path d="M43.696 43.678a.866.866 0 0 0 .255-.614V21.997H22.015l21.68 21.68z" fill="#20B718"></path>
                                                        <path d="M43.696.317l-21.68 21.68H43.95V.931a.867.867 0 0 0-.255-.614" fill="#FCEA10"></path>
                                                        <path d="M22.015 43.933h21.067a.87.87 0 0 0 .614-.255l-21.68-21.68v21.935z" fill="#2CB1E5"></path>
                                                        <path d="M.08 21.997v21.067c0 .239.097.456.255.614l21.68-21.68H.08z" fill="#662483"></path>
                                                        <path d="M.335 43.678a.867.867 0 0 0 .614.255h21.066V21.997L.335 43.677z" fill="#126EB2"></path>
                                                    </g>
                                                </svg>
                                            </label>
                                        </div>
                                    </div>
                                </div>
    
                                <div v-if="activeFace === 'back-face'">
                                    <div class="aso-flex aso-flex-wrap aso-gap-2 aso-p-1">
                                        <div v-for="(color, index) in borderColors2"  class="aso-flex aso-flex-col aso-full-center aso-space-y-2">
                                            <div @click="changeBorderColor(color.codeHex, color.additionalPrice)" :class="`${activeFace2BorderColor === color.codeHex ? `aso-ring-2 aso-ring-[${configColors.backgroundColorHeader}]` : ``} aso-w-12 aso-h-12 aso-bg-[${color.codeHex}] aso-flex aso-full-center aso-font-bold aso-text-lg aso-rounded-full aso-cursor-pointer`"></div>
                                            <p class="aso-text-xs">{{color.name}}</p>    
                                            <p v-if="color.additionalPrice > 0" class="aso-text-[10px] aso-leading-normal">({{color.additionalPrice}} {{props.currency}})</p>
                                            <p v-if="!color.additionalPrice > 0" class="aso-text-[10px] aso-leading-normal aso-invisible">none</p>
                                        </div>
                                        <div :class="`aso-relative`">
                                            <input id="aso-setBorderColor2" type="color" v-model="borderCustomColor2" class="aso-invisible aso-w-0 aso-h-0 aso-absolute aso-top-[30%] aso-left-[30%]" @input="changeBorderColor($event.target.value , 0)" />
                                            <label for="aso-setBorderColor2" v-if="customBorderColor2" :class="`${activeSignColor == 'custom' ? `aso-ring-2 aso-ring-[${configColors.backgroundColorHeader}]` : `` } aso-w-12 aso-h-12 aso-flex aso-full-center aso-rounded-full aso-overflow-hidden`">
                                                <svg viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" class="aso-w-full aso-h-full">
                                                    <g fill="none" fill-rule="evenodd">
                                                        <path d="M22.015.061H.95a.866.866 0 0 0-.614.256l21.68 21.68V.061z" fill="#CE1128"></path>
                                                        <path d="M.335.317A.867.867 0 0 0 .08.93v21.066h21.935L.335.317z" fill="#ED2E8A"></path>
                                                        <path d="M43.696.317a.866.866 0 0 0-.614-.256H22.015v21.936L43.695.317z" fill="#F99410"></path>
                                                        <path d="M43.696 43.678a.866.866 0 0 0 .255-.614V21.997H22.015l21.68 21.68z" fill="#20B718"></path>
                                                        <path d="M43.696.317l-21.68 21.68H43.95V.931a.867.867 0 0 0-.255-.614" fill="#FCEA10"></path>
                                                        <path d="M22.015 43.933h21.067a.87.87 0 0 0 .614-.255l-21.68-21.68v21.935z" fill="#2CB1E5"></path>
                                                        <path d="M.08 21.997v21.067c0 .239.097.456.255.614l21.68-21.68H.08z" fill="#662483"></path>
                                                        <path d="M.335 43.678a.867.867 0 0 0 .614.255h21.066V21.997L.335 43.677z" fill="#126EB2"></path>
                                                    </g>
                                                </svg>
                                            </label>
                                        </div>
    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <div v-show="step == 'text'" class="aso-flex aso-flex-col lg:aso-space-y-3 aso-w-full aso-h-full" id="aso-texts-section">
                        <p :class="`aso-hidden lg:aso-flex aso-bg-[${configColors.backgroundColorHeader}] aso-text-[${configColors.textColorContentHeader}] aso-text-lg aso-font-semibold aso-p-2 aso-px-4`">{{configVisualiserTexts.textOptionText}}</p>    
    
                        <div :class="`aso-bg-[${configColors.backgroundColorHeader}]/10 aso-flex aso-flex-col aso-space-y-3 aso-full-center aso-p-4 aso-m-1`">
                            <span v-show="selectText" @click="changeText" :class="`aso-w-3/4 aso-flex aso-full-center aso-space-x-3 aso-text-[${configColors.backgroundButton}] aso-border aso-border-solid aso-border-[${configColors.backgroundButton}] aso-text-md aso-p-2 aso-px-4 aso-rounded-full aso-cursor-pointer`">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="aso-w-5 aso-h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                                </svg>
                                <p class="aso-text-center aso-px-2">Change text</p>
                            </span>

                            <span @click="addTextToSign()" :class="`aso-w-3/4 aso-flex aso-full-center aso-space-x-3 aso-bg-[${configColors.backgroundButton}] hover:aso-bg-[${configColors.backgroundColorHoverButton}] aso-text-[${configColors.textColorButton}] hover:aso-text-[${configColors.textColorHoverButton}] aso-border aso-text-white aso-text-md aso-p-2 aso-px-4 aso-rounded-full aso-cursor-pointer aso-base-animation`">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="aso-w-5 aso-h-5">
                                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clip-rule="evenodd" />
                                </svg>
                                <p class="aso-text-center">Add new text</p>
                            </span>
                        </div>

                        <div class="aso-h-full aso-overflow-auto aso-scrollBar aso-space-y-2 aso-p-3">
                                    
                            <div v-show="!selectText">
                                <p class="aso-font-medium" v-show="addedTexts.length > 0">Text added</p>
                                <div class="aso-p-2 aso-space-y-2">
                                    <div v-for="(textObject, index) in addedTexts">
                                        <div :class="`${activeFace == textObject.canvasName ? `aso-cursor-pointer` : `aso-cursor-not-allowed`} aso-bg-[${configColors.backgroundColorHeader}]/10 aso-p-2`" @click="getTextObject(textObject, true)">
                                            <p class="aso-text-sm">{{configVisualiserTexts.textOptionText && configVisualiserTexts.textOptionText.trim() != '' ? configVisualiserTexts.textOptionText : 'Text'}} {{ index }}</p>
                                            <p class="aso-text-xs">{{textObject.text}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
    
                            <div v-show="selectText" class="aso-space-1">
                                <textarea name="" id="aso-text-editor" class="aso-h-24 aso-w-full aso-border aso-border-zinc-600 aso-p-1 aso-rounded-sm" v-model="selectedText.value" @input="changeTextValue"></textarea>
    
                                <div v-show="allFonts.length > 0" class="aso-space-y-1">
                                    <p class="aso-font-medium">Font</p>
                                    <div @click="dropFontToggle()" id="aso-fontSelected-dropdown" :class="`aso-cursor-pointer aso-items-center aso-space-x-3 aso-bg-[${configColors.backgroundButton}] hover:aso-bg-[${configColors.backgroundColorHoverButton}] aso-text-[${configColors.textColorButton}] hover:aso-text-[${configColors.textColorHoverButton}]  aso-px-2 aso-border border-gray-400 aso-rounded-md aso-flex aso-justify-between aso-text-base aso-base-animation`">
                                        <div :class="`aso-w-fit aso-flex aso-items-center aso-justify-center aso-font-[${fontFamSelected.replaceAll(/\s+/g, '-')}] aso-p-2`">
                                            <p v-show="fontFamSelected != ''" :class="`lg:aso-text-sm `" >{{ fontFamSelected }}</p>
                                            <p v-show="fontFamSelected == ''" class="lg:aso-text-sm xl:aso-text-base" >Font</p>
                                        </div>
                                        <div class="aso-flex aso-items-center aso-justify-center">
                                            <svg v-show="!showFont" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6 lg:w-5 lg:aso-h-5">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                            </svg>
                                            <svg v-show="showFont" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6 lg:w-5 lg:aso-h-5">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                            </svg>                                  
                                        </div>
                                    </div>
                                    <div v-show="showFont" class="aso-flex aso-flex-wrap aso-gap-2 aso-p-1">
                                        <div class="aso-flex aso-items-center aso-justify-center aso-w-fit aso-h-10" v-for="(font, index) in allFonts">
                                            <input type="radio" :id="font.label + index + 1" name="aso-fonts" class=" peer aso-hidden " @click="changeTextFontFam((font.label.replaceAll(/\s+/g, '-')), index)">
                                            <label :for="font.label + index + 1" :class="`${fontFamSelected == font.label ? `aso-ring-2 aso-ring-[${configColors.backgroundButton}] aso-text-[${configColors.backgroundButton}]` : `aso-text-[${configColors.textColorOptionsMenu}]`} 
                                                aso-font-[${font.label.replaceAll(/\s+/g, '-')}] aso-w-full aso-border-solid aso-border aso-justify-center aso-font-semibold aso-text-sm hover:aso-text-[${configColors.backgroundButton}] hover:aso-border-[${configColors.backgroundButton}] aso-rounded-md aso-p-2 aso-text-center aso-cursor-pointer aso-transition-all aso-ease-in-out aso-duration-500`"
                                                >
                                                {{font.label}}
                                            </label>
                                        </div>
                                    </div>
                                </div>
    
                                <div class="aso-w-full aso-flex aso-justify-between">
                                    <div v-if="configTextSettings.enableTextAlignment" :class="`${!configTextFontSettings.active ? `aso-w-full` : `aso-w-[45%]`} aso-space-y-2 aso-flex aso-flex-col`">
                                        <p class="aso-font-medium">Text alignment</p>
                                        <div class="aso-flex aso-flex-1 aso-w-full aso-rounded-md aso-overflow-hidden">
                                            <span @click="changeTextAlign('left')" :class="`${selectedText.align === 'left' ? `aso-bg-[${configColors.backgroundButton}] aso-text-[${configColors.textColorButton}]` : 'aso-bg-white aso-text-black'} hover:aso-bg-[${configColors.backgroundColorHoverButton}] hover:aso-text-[${configColors.textColorHoverButton}] aso-w-1/3 aso-flex aso-full-center aso-p-1 aso-border aso-base-animation aso-cursor-pointer`">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                                                </svg>
                                            </span>
                                            <span @click="changeTextAlign('center')" :class="`${selectedText.align === 'center' ? `aso-bg-[${configColors.backgroundButton}] aso-text-[${configColors.textColorButton}]` : 'aso-bg-white aso-text-black'} hover:aso-bg-[${configColors.backgroundColorHoverButton}] hover:aso-text-[${configColors.textColorHoverButton}] aso-w-1/3 aso-flex aso-full-center aso-p-1 aso-border aso-base-animation aso-cursor-pointer`">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                                </svg>
                                            </span>
                                            <span @click="changeTextAlign('right')" :class="`${selectedText.align === 'right' ? `aso-bg-[${configColors.backgroundButton}] aso-text-[${configColors.textColorButton}]` : 'aso-bg-white aso-text-black'} hover:aso-bg-[${configColors.backgroundColorHoverButton}] hover:aso-text-[${configColors.textColorHoverButton}] aso-w-1/3 aso-flex aso-full-center aso-p-1 aso-border aso-base-animation aso-cursor-pointer`">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div v-show="configTextFontSettings.active" :class="`${!configTextSettings.enableTextAlignment ? `aso-w-full` : `aso-w-[45%]`} aso-space-y-2 aso-flex aso-flex-col`">
                                        <p class="aso-font-medium">{{configVisualiserTexts.textSize && configVisualiserTexts.textSize.trim() !== '' ? configVisualiserTexts.textSize : 'Size'}}</p>
                                        <div class="aso-flex aso-flex-1 aso-w-full">
                                            <span @click="changeTextSizeValue('down')" :class="`aso-w-1/3 aso-h-full aso-flex aso-full-center aso-bg-[${configColors.backgroundButton}] aso-text-[${configColors.textColorButton}] hover:aso-bg-[${configColors.backgroundColorHoverButton}] hover:aso-text-[${configColors.textColorHoverButton}] aso-rounded-s-md aso-cursor-pointer aso-base-animation`">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="aso-w-5 aso-h-5">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                                                </svg>
                                            </span>

                                            <input type="number" name="" id="aso-text-size" class="aso-w-1/3 aso-h-full aso-border aso-border-red-600 aso-p-1 aso-text-center" :min="configTextFontSettings.minimumFontSize" :max="configTextFontSettings.maximumFontSize" @input="changeTextSize($event.target.value, configTextFontSettings.minimumFontSize, configTextFontSettings.maximumFontSize)" disabled>
                                            
                                            <span @click="changeTextSizeValue('up')" :class="`aso-w-1/3 aso-h-full aso-flex aso-full-center aso-bg-[${configColors.backgroundButton}] aso-text-[${configColors.textColorButton}] hover:aso-bg-[${configColors.backgroundColorHoverButton}] hover:aso-text-[${configColors.textColorHoverButton}] aso-rounded-e-md aso-cursor-pointer aso-base-animation`">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="aso-w-5 aso-h-5">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </div>
    
                                <div v-if="(activeFace === 'front-face' && !signTextColor1.active) || (activeFace === 'back-face' && !signTextColor2.active)" class="aso-space-y-1">
                                    <p class="aso-font-medium">Color</p>
                                    <div class="aso-w-full aso-flex aso-flex-wrap aso-gap-2 aso-items-center aso-p-1 aso-border">
                                        <div v-for="(color, index) in configTextSettings.colors" class="">
                                            <div @click="changeTextColor(color.codeHex)" :class="`${selectedText.color === color.codeHex ? `aso-ring-2 aso-ring-[${configColors.backgroundColorHeader}]` : `` } aso-w-8 aso-h-8 aso-bg-[${color.codeHex}] aso-p-2 aso-rounded-sm aso-border aso-cursor-pointer`"></div>
                                        </div>
    
                                        <div :class="`aso-relative`">
                                            <input id="aso-setTextColor1" type="color" v-model="customTextColor" class="aso-invisible aso-w-0 aso-h-0 aso-absolute aso-top-[50%]" @input="changeTextColor($event.target.value)" />
                                            <label for="aso-setTextColor1" v-if="configTextSettings.enableCustomColor" :class="`${activeSignColor == 'custom' ? `aso-border-4 aso-border-solid aso-border-[#016464]` : `` } aso-w-8 aso-h-8 aso-flex aso-full-center aso-overflow-hidden aso-cursor-pointer`">
                                                <svg viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" class="aso-w-full aso-h-full">
                                                    <g fill="none" fill-rule="evenodd">
                                                        <path d="M22.015.061H.95a.866.866 0 0 0-.614.256l21.68 21.68V.061z" fill="#CE1128"></path>
                                                        <path d="M.335.317A.867.867 0 0 0 .08.93v21.066h21.935L.335.317z" fill="#ED2E8A"></path>
                                                        <path d="M43.696.317a.866.866 0 0 0-.614-.256H22.015v21.936L43.695.317z" fill="#F99410"></path>
                                                        <path d="M43.696 43.678a.866.866 0 0 0 .255-.614V21.997H22.015l21.68 21.68z" fill="#20B718"></path>
                                                        <path d="M43.696.317l-21.68 21.68H43.95V.931a.867.867 0 0 0-.255-.614" fill="#FCEA10"></path>
                                                        <path d="M22.015 43.933h21.067a.87.87 0 0 0 .614-.255l-21.68-21.68v21.935z" fill="#2CB1E5"></path>
                                                        <path d="M.08 21.997v21.067c0 .239.097.456.255.614l21.68-21.68H.08z" fill="#662483"></path>
                                                        <path d="M.335 43.678a.867.867 0 0 0 .614.255h21.066V21.997L.335 43.677z" fill="#126EB2"></path>
                                                    </g>
                                                </svg>
                                            </label>
                                        </div>
                                    </div>
                                </div>
    
                                <div class="aso-space-y-1">
                                    <p class="aso-font-medium">Other custom</p>
                                    <div class="aso-w-full aso-flex aso-items-center">
                                        <div class="aso-flex aso-flex-wrap aso-gap-3">
                                            <span @click="cloneObject()" :class="`aso-flex aso-flex-col aso-full-center aso-space-y-1 hover:aso-text-[${configColors.backgroundColorHeader}] aso-cursor-pointer`">
                                                <svg viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg" class="aso-w-7 aso-h-7">
                                                    <g clip-path="url(#clip0_65_739)">
                                                        <path d="M6 6.5H22V10.5H24V6.5C24 5.96957 23.7893 5.46086 23.4142 5.08579C23.0391 4.71071 22.5304 4.5 22 4.5H6C5.46957 4.5 4.96086 4.71071 4.58579 5.08579C4.21071 5.46086 4 5.96957 4 6.5V22.5C4 23.0304 4.21071 23.5391 4.58579 23.9142C4.96086 24.2893 5.46957 24.5 6 24.5H10V22.5H6V6.5Z" fill="currentColor"/>
                                                        <path d="M30 12.5H14C13.4696 12.5 12.9609 12.7107 12.5858 13.0858C12.2107 13.4609 12 13.9696 12 14.5V30.5C12 31.0304 12.2107 31.5391 12.5858 31.9142C12.9609 32.2893 13.4696 32.5 14 32.5H30C30.5304 32.5 31.0391 32.2893 31.4142 31.9142C31.7893 31.5391 32 31.0304 32 30.5V14.5C32 13.9696 31.7893 13.4609 31.4142 13.0858C31.0391 12.7107 30.5304 12.5 30 12.5ZM30 30.5H14V14.5H30V30.5Z" fill="currentColor"/>
                                                        <path d="M21 28.5H23V23.5H28V21.5H23V16.5H21V21.5H16V23.5H21V28.5Z" fill="currentColor"/>
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_65_739">
                                                            <rect width="36" height="36" fill="none" transform="translate(0 0.5)"/>    
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                                <p class="aso-text-xs aso-font-semibold">
                                                    {{ configVisualiserTexts.textCanvasClone && configVisualiserTexts.textCanvasClone.trim() !== '' ? configVisualiserTexts.textCanvasClone : 'Clone' }}
                                                </p>
                                            </span>
    
                                            <span @click="deleteObject()" :class="`aso-flex aso-flex-col aso-full-center aso-space-y-1 hover:aso-text-[${configColors.backgroundColorHeader}] aso-cursor-pointer`">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-7 aso-h-7">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                                <p class="aso-text-xs aso-font-semibold">
                                                    {{ configVisualiserTexts.textCanvasDelete && configVisualiserTexts.textCanvasDelete.trim() !== '' ? configVisualiserTexts.textCanvasDelete : 'Delete' }}
                                                </p>
                                            </span>
    
                                            <span v-if="configTextSettings.enableBold" @click="changeTextWeight" :class="`${selectedText.weight == 'bold' ? `aso-text-[${configColors.backgroundColorHeader}]` : ''} aso-flex aso-flex-col aso-full-center aso-space-y-1 hover:aso-text-[${configColors.backgroundColorHeader}] aso-cursor-pointer`">
                                                <svg  fill="none" xmlns="http://www.w3.org/2000/svg" class="aso-w-7 aso-h-7">
                                                    <path d="M12.0151 1.84998C15.2551 1.84998 17.6851 2.25498 19.3051 3.19998C21.0601 4.14498 21.8701 5.76498 21.8701 8.05998C21.8701 9.40998 21.4651 10.625 20.9251 11.57C20.619 12.0316 20.2214 12.4255 19.757 12.7274C19.2926 13.0292 18.7712 13.2326 18.2251 13.325C18.9968 13.5052 19.7289 13.8255 20.3851 14.27C20.9251 14.675 21.4651 15.35 21.8701 16.025C22.2926 17.0029 22.4776 18.0669 22.4101 19.13C22.4578 20.1053 22.2749 21.0781 21.8761 21.9694C21.4773 22.8608 20.874 23.6455 20.1151 24.26C18.1933 25.6325 15.8569 26.3 13.5001 26.15H4.45508V1.84998H12.0151ZM12.5551 11.435C14.0401 11.435 15.1201 11.3 15.6601 10.76C16.3351 10.355 16.6051 9.54497 16.6051 8.73497C16.6051 7.78998 16.2001 7.11497 15.5251 6.70998C14.8501 6.30498 13.7701 6.03498 12.2851 6.03498H9.58508V11.435H12.5551ZM9.58508 15.485V22.1H12.9601C14.4451 22.1 15.6601 21.695 16.2001 21.155C16.8751 20.48 17.1451 19.805 17.1451 18.725C17.1612 18.3169 17.0845 17.9105 16.9208 17.5364C16.7571 17.1622 16.5107 16.8301 16.2001 16.565C15.5251 16.025 14.4451 15.755 12.8251 15.755H9.45008L9.58508 15.485Z" fill="currentColor"/>
                                                </svg>
                                                <p class="aso-text-xs aso-font-semibold">Bold</p>
                                            </span>
    
                                            <span v-if="configTextSettings.enableItalic" @click="changeTextStyle" :class="`${selectedText.style == 'italic' ? `aso-text-[${configColors.backgroundColorHeader}]` : ''} aso-flex aso-flex-col aso-full-center aso-space-y-1 hover:aso-text-[${configColors.backgroundColorHeader}] aso-cursor-pointer`">
                                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="aso-w-7 aso-h-7">
                                                    <path d="M11 5H17M7 19H13M14 5L10 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg>
                                                <p class="aso-text-xs aso-font-semibold">Italic</p>
                                            </span>
    
                                            <span v-if="configTextSettings.enableUnderline" @click="underlineText" :class="`${selectedText.underline == true ? `aso-text-[${configColors.backgroundColorHeader}]` : ''} aso-flex aso-flex-col aso-full-center aso-space-y-1 hover:aso-text-[${configColors.backgroundColorHeader}] aso-cursor-pointer`">
                                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="aso-w-7 aso-h-7">
                                                    <path d="M7 5V10C7 11.3261 7.52678 12.5979 8.46447 13.5355C9.40215 14.4732 10.6739 15 12 15C13.3261 15 14.5979 14.4732 15.5355 13.5355C16.4732 12.5979 17 11.3261 17 10V5M5 19H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg>
                                                <p class="aso-text-xs aso-font-semibold">Underline</p>
                                            </span>
    
                                            <span v-if="configTextSettings.enableStrike" @click="crossText" :class="`${selectedText.linethrough == true ? `aso-text-[${configColors.backgroundColorHeader}]` : ''} aso-flex aso-flex-col aso-full-center aso-space-y-1 hover:aso-text-[${configColors.backgroundColorHeader}] aso-cursor-pointer`">
                                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="aso-w-7 aso-h-7">
                                                    <path d="M7 8V13M7 13C7 14.3261 7.52678 15.5979 8.46447 16.5355C9.40215 17.4732 10.6739 18 12 18C13.3261 18 14.5979 17.4732 15.5355 16.5355C16.4732 15.5979 17 14.3261 17 13M7 13H17M17 13V8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                    <line x1="3.79883" y1="13" x2="20.1988" y2="13" stroke="currentColor"/>
                                                </svg>
                                                <p class="aso-text-xs aso-font-semibold">Crossline</p>
                                            </span>
    
                                            <span v-if="configTextSettings.enableOverline" @click="overlineText" :class="`${selectedText.overline == true ? `aso-text-[${configColors.backgroundColorHeader}]` : ''} aso-flex aso-flex-col aso-full-center aso-space-y-1 hover:aso-text-[${configColors.backgroundColorHeader}] aso-cursor-pointer`">
                                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="aso-w-7 aso-h-7">
                                                    <path d="M7 9V14C7 15.3261 7.52678 16.5979 8.46447 17.5355C9.40215 18.4732 10.6739 19 12 19C13.3261 19 14.5979 18.4732 15.5355 17.5355C16.4732 16.5979 17 15.3261 17 14V9M5 5H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg>
                                                <p class="aso-text-xs aso-font-semibold">Overline</p>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <div v-show="step == 'image'" class="aso-relative aso-flex aso-flex-col lg:aso-space-y-3 aso-w-full aso-h-full" id="aso-images-section">
                        <p :class="`aso-hidden lg:aso-flex aso-bg-[${configColors.backgroundColorHeader}] aso-text-[${configColors.textColorContentHeader}] aso-text-lg aso-font-semibold aso-p-2 aso-px-4`">{{configVisualiserTexts.textImage}}</p>    

                        <div :class="`aso-bg-[${configColors.backgroundColorHeader}]/10 aso-flex aso-flex-col aso-space-y-3 aso-full-center aso-p-4 aso-m-1`">
                            <span v-show="configImageSettingsClipart.active && !clipartSection && !editImage" :class="`aso-w-3/4 aso-text-[${configColors.backgroundButton}] aso-border aso-border-solid aso-border-[${configColors.backgroundButton}] aso-text-md aso-p-2 aso-px-4 aso-rounded-full aso-cursor-pointer`">
                                <span @click="()=> {showClipartsSection(true); editImage = false}" :class="`aso-flex aso-full-center aso-space-x-3`">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                    </svg>
                                    <p class="aso-text-center">Browse archive image</p>
                                </span>
                            </span>

                            <span v-show="(clipartSection && !editImage) || editImage" :class="`aso-w-3/4 aso-text-[${configColors.backgroundButton}] aso-border aso-border-solid aso-border-[${configColors.backgroundButton}] aso-text-md aso-p-2 aso-px-4 aso-rounded-full aso-cursor-pointer`">
                                <span @click="()=> {showClipartsSection(false); editImage = false}" :class="`aso-flex aso-full-center aso-space-x-3`">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="aso-w-6 aso-h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                    <p class="aso-text-center">Edit image</p>
                                </span>
                            </span>

                            <label v-if="configImageSettings.enableUploadImage  && !clipartSection" :class="`aso-w-3/4 aso-flex aso-p-2 aso-px-4 aso-space-x-2 aso-rounded-full aso-full-center aso-bg-[${configColors.backgroundButton}] hover:aso-bg-[${configColors.backgroundColorHoverButton}] aso-text-[${configColors.textColorButton}] hover:aso-text-[${configColors.textColorHoverButton}] aso-text-md aso-cursor-pointer`">
                                <input @click="addImageToSign()" class="aso-hidden" id="aso-iamge-input" type="file" name="aso-pickImages" :accept="configImagesFormat" style="display: none;"/>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>
                                <p>Upload image</p>
                            </label>
                        </div>

                        <div class="aso-h-full aso-space-y-2 aso-p-2 aso-overflow-auto aso-scrollBar">

                            <div v-show="!editImage && !clipartSection" class="aso-p-2">
                                <div v-if="usedImages.length > 0" class="aso-space-y-1">
                                    <p class="aso-font-medium">Currently in use</p>
                                    <div class="aso-flex aso-items-center aso-flex-wrap aso-gap-2 aso-p-1">
                                        <div v-for="(usedImage, index) in usedImages">
                                            <div @click="editAddedImage(usedImage.object)" :class="`${activeFace == usedImage.object.canvasName ? `aso-cursor-pointer` : `aso-cursor-not-allowed`} aso-flex aso-flex-col aso-space-y-2 aso-full-center aso-p-1 hover:aso-bg-[${configColors.backgroundColorHeader}]/20 aso-border aso-cursor-pointer aso-base-animation`">
                                                <img :src="usedImage.url" alt="" class="aso-w-20 aso-h-auto">
                                                <p class="aso-text-xs aso-font-medium">Edit image</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-show="recentlyUsedImages.length > 0" class="aso-space-y-1">
                                    <p class="aso-font-medium">Reccently used</p>
                                    <div class="aso-flex aso-items-center aso-flex-wrap aso-gap-2 aso-p-1">
                                        <div v-for="(image, index) in recentlyUsedImages">
                                            <div :class="`aso-relative aso-flex aso-flex-col aso-space-y-2 aso-full-center aso-p-1 hover:aso-bg-[${configColors.backgroundColorHeader}]/20 aso-border aso-cursor-pointer aso-base-animation`">
                                                <img :src="image.url" alt="" class="aso-w-20 aso-h-auto">
                                                <!-- <img @click="addImageToSign(image.url, image.object.price)" :src="image.url" alt="" class="aso-w-20 aso-h-auto"> -->
                                                <!-- <span @click="deleteFromRecentlyUsed(index, recentlyUsedImages)" :class="`aso-absolute aso-top-0 aso-right-0 aso-translate-y-[-50%] aso-translate-x-[20%] aso-bg-[${configColors.backgroundButton}] hover:aso-bg-[${configColors.backgroundColorHoverButton}] aso-text-[${configColors.textColorButton}] hover:aso-text-[${configColors.textColorHoverButton}] aso-flex aso-p-0.5 aso-rounded-md`">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="aso-w-4 aso-h-4">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                    </svg>
                                                </span> -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div v-if="clipartSection && !editImage">
                                <div v-if="configImageSettingsClipart.active" class="aso-space-y-3">
                                    <div class="aso-flex aso-flex-col aso-space-y-2">
                                        <div v-for="(clipart, index) in allClipart">
                                            <div @click="showClipartImages(clipart.cliparts, index)" class="aso-flex aso-flex-col aso-space-y-3 aso-justify-start aso-py-3 aso-rounded-lg aso-cursor-pointer">
                                                <div class="aso-text-base aso-font-semibold aso-flex aso-justify-between aso-items-center">
                                                    <p>{{clipart.title}}</p>
                                                    <span :class="`aso-flex aso-text-[${configColors.backgroundColorHeader}]`">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" class="aso-w-7 aso-h-7">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                                        </svg>
                                                    </span>
                                                </div>
                                                <p class="aso-text-xs">{{clipart.description}}</p>
                                            </div>
                                            <div v-show="showClipart && clipartId == index" :class="`aso-relative lg:aso-absolute lg:aso-top-0 lg:aso-right-0 lg:aso-translate-x-[101%] lg:aso-w-full lg:aso-h-[90%] aso-bg-[${configColors.backgroundColorOptionsMenu}] aso-text-[${configColors.textColorOptionsMenu}] lg:aso-shadow-xl`">
                                                <div class="aso-flex aso-flex-wrap aso-gap-2 aso-p-1">
                                                    <div v-for="(image, id) in currentClipart">
                                                        <div @click="addImageToSign(image.url, image.additionalPrice, id)" class="aso-flex aso-flex-col aso-space-y-2 aso-full-center aso-p-1 aso-border aso-cursor-pointer">
                                                            <img :src="image.url" alt="" class="aso-w-20 aso-h-20 aso-border aso-border-solid aso-p-1">
                                                            <p class="aso-text-sm aso-font-medium">{{image.title}}</p>
                                                            <p v-if="image.additionalPrice > 0" class="aso-text-[11px] aso-leading-normal">({{image.additionalPrice}} {{props.currency}})</p>
                                                            <p v-if="!image.additionalPrice > 0" class="aso-text-[11px] aso-leading-normal aso-invisible">none</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="aso-absolute aso-top-0 aso-right-0 aso-w-fit aso-h-fit aso-cursor-pointer">
                                                    <span @click="()=>{showClipart = false}" :class="`aso-flex aso-bg-[${configColors.backgroundColorHeader}] aso-text-[${configColors.textColorContentHeader}] hover:aso-bg-aso-bg-[${configColors.backgroundColorHeader}]/30 aso-p-1 aso-base-animation`">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="aso-w-5 aso-h-5">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div v-show="editImage" class="aso-p-2">
                                <div>
                                    <p class="aso-font-medium">Size</p>
                                    <div class="aso-p-2 aso-space-y-1">
                                        <!-- <label class="aso-text-xs" for="aso-image-sizeWidth">width</label> -->
                                        <input type="range" name="aso-imageSize" id="aso-image-sizeWidth" class="aso-w-full" :min="0.1" :max="1.4" :step="0.05" :value="0.4" @input="changeImageWidth">
                                        <!-- <label class="aso-text-xs" for="aso-image-sizeHeight">height</label>
                                        <input type="range" name="aso-imageSize" id="aso-image-sizeHeight" class="aso-w-full" :min="0.1" :max="1.4" :step="0.05" :value="0.4" @change="changeImageHeight"> -->
                                        <p class="aso-flex aso-full-center aso-font-medium"> <span id="image-width"></span> x <span id="image-height"></span> </p>
                                    </div>
                                </div>

                                <div v-if="configImageSettingsFilters.active" class="aso-space-y-2">
                                    <p class="aso-font-medium">Filters</p>
                                    <div class="aso-w-full aso-flex aso-items-center">
                                        <div class="aso-flex aso-space-x-6">
                                            <span @click="selectImageFilter('Blur')" :class="`${setFilter.blur ? `aso-text-[${configColors.backgroundColorHeader}]` : ``} aso-flex aso-flex-col aso-full-center aso-space-y-4 hover:aso-text-[${configColors.backgroundColorHeader}] aso-base-animation aso-cursor-pointer`">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-5 aso-h-5">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                                                </svg>
                                                <p class="aso-text-xs aso-font-semibold">Blur</p>
                                            </span>
                                            <span @click="selectImageFilter('Greyscale')" :class="`${setFilter.greyscale ? `aso-text-[${configColors.backgroundColorHeader}]` : ``} aso-flex aso-flex-col aso-full-center aso-space-y-4 hover:aso-text-[${configColors.backgroundColorHeader}] aso-base-animation aso-cursor-pointer`">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-5 aso-h-5">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                                                </svg>
                                                <p class="aso-text-xs aso-font-semibold">Greyscale</p>
                                            </span>
                                            <span @click="selectImageFilter('Sepia')" :class="`${setFilter.sepia ? `aso-text-[${configColors.backgroundColorHeader}]` : ``} aso-flex aso-flex-col aso-full-center aso-space-y-4 hover:aso-text-[${configColors.backgroundColorHeader}] aso-base-animation aso-cursor-pointer`">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-5 aso-h-5">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                                                </svg>
                                                <p class="aso-text-xs aso-font-semibold">Sepia</p>
                                            </span>
                                            <span @click="selectImageFilter('Emboss')" :class="`${setFilter.embross ? `aso-text-[${configColors.backgroundColorHeader}]` : ``} aso-flex aso-flex-col aso-full-center aso-space-y-4 hover:aso-text-[${configColors.backgroundColorHeader}] aso-base-animation aso-cursor-pointer`">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-5 aso-h-5">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                                                </svg>
                                                <p class="aso-text-xs aso-font-semibold">Emboss</p>
                                            </span>
                                            <span @click="selectImageFilter('Sharpen')" :class="`${setFilter.sharpen ? `aso-text-[${configColors.backgroundColorHeader}]` : ``} aso-flex aso-flex-col aso-full-center aso-space-y-4 hover:aso-text-[${configColors.backgroundColorHeader}] aso-base-animation aso-cursor-pointer`">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-5 aso-h-5">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                                                </svg>
                                                <p class="aso-text-xs aso-font-semibold">Sharpen</p>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div class="aso-space-y-3">
                                    <p class="aso-font-medium">Other custom</p>
                                    <div class="aso-w-full aso-flex aso-items-center">
                                        <div class="aso-flex aso-space-x-6">
                                            <span @click="cloneObject()" :class="`aso-flex aso-flex-col aso-full-center aso-space-y-1 hover:aso-text-[${configColors.backgroundColorHeader}] aso-cursor-pointer`">
                                                <svg viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg" class="aso-w-7 aso-h-7">
                                                    <g clip-path="url(#clip0_65_739)">
                                                        <path d="M6 6.5H22V10.5H24V6.5C24 5.96957 23.7893 5.46086 23.4142 5.08579C23.0391 4.71071 22.5304 4.5 22 4.5H6C5.46957 4.5 4.96086 4.71071 4.58579 5.08579C4.21071 5.46086 4 5.96957 4 6.5V22.5C4 23.0304 4.21071 23.5391 4.58579 23.9142C4.96086 24.2893 5.46957 24.5 6 24.5H10V22.5H6V6.5Z" fill="currentColor"/>
                                                        <path d="M30 12.5H14C13.4696 12.5 12.9609 12.7107 12.5858 13.0858C12.2107 13.4609 12 13.9696 12 14.5V30.5C12 31.0304 12.2107 31.5391 12.5858 31.9142C12.9609 32.2893 13.4696 32.5 14 32.5H30C30.5304 32.5 31.0391 32.2893 31.4142 31.9142C31.7893 31.5391 32 31.0304 32 30.5V14.5C32 13.9696 31.7893 13.4609 31.4142 13.0858C31.0391 12.7107 30.5304 12.5 30 12.5ZM30 30.5H14V14.5H30V30.5Z" fill="currentColor"/>
                                                        <path d="M21 28.5H23V23.5H28V21.5H23V16.5H21V21.5H16V23.5H21V28.5Z" fill="currentColor"/>
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_65_739">
                                                            <rect width="36" height="36" fill="none" transform="translate(0 0.5)"/>    
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                                <p class="aso-text-xs aso-font-semibold">
                                                    {{ configVisualiserTexts.textCanvasClone && configVisualiserTexts.textCanvasClone.trim() !== '' ? configVisualiserTexts.textCanvasClone : 'Clone' }}
                                                </p>
                                            </span>

                                            <span @click="deleteObject()" :class="`aso-flex aso-flex-col aso-full-center aso-space-y-1 hover:aso-text-[${configColors.backgroundColorHeader}] aso-cursor-pointer`">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-7 aso-h-7">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                                <p class="aso-text-xs aso-font-semibold">
                                                    {{ configVisualiserTexts.textCanvasDelete && configVisualiserTexts.textCanvasDelete.trim() !== '' ? configVisualiserTexts.textCanvasDelete : 'Delete' }}
                                                </p>
                                            </span>

                                            <span @click="turnLeftImage()" :class="`aso-flex aso-flex-col aso-full-center aso-space-y-4 hover:aso-text-[${configColors.backgroundColorHeader}] aso-base-animation`">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-5 aso-h-5">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                                                </svg>
                                                <p class="aso-text-xs aso-font-semibold">Turn left</p>
                                            </span>

                                            <span @click="turnRightImage()" :class="`aso-flex aso-flex-col aso-full-center aso-space-y-4 hover:aso-text-[${configColors.backgroundColorHeader}] aso-base-animation`">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-5 aso-h-5">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3" />
                                                </svg>
                                                <p class="aso-text-xs aso-font-semibold">Turn right</p>
                                            </span>

                                            <span @click="flipImage()" :class="`aso-flex aso-flex-col aso-full-center aso-space-y-4 hover:aso-text-[${configColors.backgroundColorHeader}] aso-base-animation`">
                                                <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="aso-w-5 aso-h-5">
                                                    <path d="m10.562 13.984c-3.1094-0.2241-5.5625-2.8177-5.5625-5.9843 0-3.3137 2.6863-6 6-6h7c0.5523 0 1 0.44771 1 1v18c0 0.5523-0.4477 1-1 1s-1-0.4477-1-1v-7h-4.4444l-3.3144 7.4573c-0.14667 0.33-0.47392 0.5427-0.83505 0.5427-0.66129 0-1.1036-0.6807-0.83505-1.2849l2.9914-6.7308zm0.4375-1.9843c-2.2091 0-4-1.7909-4-4 0-2.2091 1.7909-4 4-4h6v8h-6z" clip-rule="evenodd" fill="currentColor" fill-rule="evenodd"></path>
                                                </svg>
                                                <p class="aso-text-xs aso-font-semibold">Flip</p>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
    
                    <div v-show="step == 'add-components'" class="aso-ralative aso-flex aso-flex-col lg:aso-space-y-1 aso-w-full aso-h-full" id="aso-fixings-section">
                        <p :class="`aso-hidden lg:aso-flex aso-bg-[${configColors.backgroundColorHeader}] aso-text-[${configColors.textColorContentHeader}] aso-text-lg aso-font-semibold aso-p-2 aso-px-4`">{{addComponentValue.title}}</p>    
    
                        <div v-if="materialType == 'simple'" class="aso-h-full aso-p-2 aso-overflow-auto aso-scrollBar">
                            <div v-for="(option, index) in addComponentValue.options">
                                <div class="aso-space-y-3 aso-w-full aso-h-full">
                                    <input type="radio" :id="'aso-addOptions' + addComponentValue.title + option.title + index" name="aso-fixings" class=" peer aso-hidden" @change="selectAddComponent(addComponentValue.title, option.title, option.additionalPrice)">
                                    <label :for="'aso-addOptions' + addComponentValue.title + option.title + index" :class="`aso-flex aso-full-center aso-space-x-2 aso-cursor-pointer hover:aso-bg-[${configColors.backgroundColorHeader}]/10 aso-p-2 aso-base-animation`">
                                        <div :class="`${option.icon === '' ? `aso-bg-[${configColors.backgroundColorHeader}]` : `` } aso-w-1/4 aso-h-20 aso-flex aso-full-center`">
                                            <img v-if="option.icon != ''" :src="option.icon" class="aso-w-auto aso-h-full" />
                                        </div>
                                        <div :class="`aso-w-3/4 aso-flex aso-flex-col aso-space-y-1 aso-text-[${configColors.textColorOptionsMenu}]`">
                                            <p class="aso-text-sm aso-font-medium first-letter:aso-uppercase">{{ option.title }} <span v-if="option.additionalPrice > 0" class="aso-text-[11px]">({{option.additionalPrice}} {{props.currency}})</span></p>
                                            <p class="aso-text-xs">{{ option.description }}</p>
                                            <div class="aso-w-full aso-flex aso-items-center aso-justify-between">
                                                <span v-if="option.popImg.trim() != ''" @click="showAddComponentExample(true, option.popImg, index)" :class="`aso-text-xs aso-text-[${configColors.backgroundColorHeader}] aso-underline aso-cursor-pointer`">example</span>
                                                <span v-if="option.popImg.trim() == ''" class="aso-invisible">example</span> 
                                                       
                                                <span :class="`${ addComponentSelected.some(item => item.option === addComponentValue.title && item.value === option.title)  ? `aso-bg-[${configColors.backgroundColorHeader}] aso-text-[${configColors.textColorContentHeader}]` : `aso-text-transparent aso-border-[${configColors.backgroundColorHeader}]`} aso-flex aso-w-fit aso-h-fit aso-p-1 aso-border-solid aso-border-2 aso-rounded-full`">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="4" stroke="currentColor" class="aso-w-4 aso-h-4">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                    </svg>
                                                </span>                
                                            </div>
                                        </div>
                                    </label>
                                </div>

                                <div v-show="showAddComponentEx && addComponentExId === index" :class="`aso-absolute aso-top-0 aso-right-0 aso-w-[85%] lg:aso-w-full aso-h-[90%] aso-overflow-auto aso-scrollBar aso-translate-y-[-50%] lg:aso-translate-y-[0%] lg:aso-translate-x-[101%] aso-bg-[${configColors.backgroundColorOptionsMenu}] aso-text-[${configColors.textColorOptionsMenu}] aso-p-2`">
                                    <img :src="addComponentExample" class="aso-w-auto aso-h-full">
                                    <div class="aso-absolute aso-top-0 aso-right-0 aso-w-fit aso-h-fit aso-cursor-pointer">
                                        <span @click="showAddComponentExample(false)" :class="`aso-flex aso-bg-[${configColors.backgroundColorHeader}] aso-text-[${configColors.textColorContentHeader}] hover:aso-bg-aso-bg-[${configColors.backgroundColorHeader}]/30 aso-p-1 aso-base-animation`">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="aso-w-5 aso-h-5">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div v-show="step == 'add-options'" class="aso-relative aso-flex aso-flex-col lg:aso-space-y-1 aso-w-full aso-h-full" id="aso-fixings-section">
                        <p :class="`aso-hidden lg:aso-flex aso-bg-[${configColors.backgroundColorHeader}] aso-text-[${configColors.textColorContentHeader}] aso-text-lg aso-font-semibold aso-p-2 aso-px-4`">{{ props.config.data.settings.languageImages.visualizer.textAdditonnalOptionsHeader && props.config.data.settings.languageImages.visualizer.textAdditonnalOptionsHeader.trim() !== '' ? props.config.data.settings.languageImages.visualizer.textAdditonnalOptionsHeader : 'Additionnals Options' }}</p>    
    
                        <div class="aso-h-full aso-space-y-2 aso-p-4 aso-overflow-auto aso-scrollBar">
                            <div v-for="(option, indexx) in configAdditionnalOptions">
                                <div v-if="option.type == 'yes/no'" class="aso-w-full">
                                    <div class="aso-flex aso-flex-col aso-space-y-2 aso-w-full">
                                        <div class="aso-flex aso-justify-between aso-items-start aso-space-x-3">
                                            <div>
                                                <p :class="`aso-text-[${configColors.backgroundColorHeader}] aso-font-medium lowercase first-letter:uppercase aso-text-[16px]`">
                                                    {{ option.label }}
                                                    <span v-if="option.price.type == 'base'">(+{{ currentDevise }}{{ option.price.value }})</span>
                                                    <span v-if="option.price.type == 'multiplier'">(+{{ option.price.value }}%)</span>
                                                </p>
                                                <p :class="` aso-text-xs lowercase first-letter:uppercase`">{{ option.description }}</p>
                                            </div>
                                            <div>
                                                <span v-if="option.popImg != ''" @click="()=>showYesNoExample(option.popImg, indexx)" :class="`aso-text-[${configColors.backgroundColorHeader}] aso-cursor-pointer aso-flex underline aso-text-base aso-font-medium p-1 aso-px-2 aso-transition-all aso-duration-500 aso-ease-in-out aso-rounded-lg`">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="aso-flex aso-space-x-4 aso-w-full">
                                            <div class="aso-flex aso-w-full">
                                                <input type="radio" :id="option.label.replace(/\s+/g, '-') +0" :value="option.inputs.yes" :name="option.label.toLowerCase().replace(/\s+/g, '-') " class="aso-hidden peer" required @click="()=>addToOrUpdateArray(customAdditionalValues, indexx, option.label, option.inputs.yes, option.price)" :price-type="option.price.type" :price-value="option.price.value">
                                                <label :for="option.label.replace(/\s+/g, '-') +0" :class="`${(customAdditionalValues.some(item => item.id === indexx) && customAdditionalValues.some(item => item.value === option.inputs.yes) )? `aso-text-[${configColors.backgroundColorHeader}] aso-ring-[${configColors.backgroundColorHeader}]`: `aso-text-[${configColors.textColorOptionsMenu}] aso-ring-[${configColors.textColorOptionsMenu}]`} hover:aso-text-[${configColors.backgroundColorHeader}] hover:aso-ring-[${configColors.backgroundColorHeader}]
                                                    aso-relative aso-cursor-pointer w-auto aso-h-auto aso-px-2 aso-w-full aso-p-3 xl:aso-px-4 aso-rounded-md  xl:aso-space-y-3 aso-ring-2 aso-flex aso-flex-col aso-justify-center xl:aso-justify-start aso-transition-all aso-duration-500 aso-ease-in-out`"
                                                >                           
                                                    <div class="aso-text-base lg:aso-text-sm xl:aso-text-md aso-font-medium aso-flex aso-justify-center aso-items-center">
                                                        <p class="lowercase first-letter:uppercase">{{option.inputs.yes}}</p>
                                                    </div>
                                                </label>
                                            </div>
                                            <div class="aso-flex aso-w-full">
                                                <input type="radio" :id="option.label.replace(/\s+/g, '-') +1" :value="option.inputs.no" :name="option.label.toLowerCase().replace(/\s+/g, '-') " class="aso-hidden peer" required @click="()=>addToOrUpdateArray(customAdditionalValues, indexx, option.label, option.inputs.no, {type: 'none', value: 0})" price-type="none" :price-value="0">
                                                <label :for="option.label.replace(/\s+/g, '-') +1" :class="`${(customAdditionalValues.some(item => item.id === indexx) && customAdditionalValues.some(item => item.value === option.inputs.no) )? `aso-text-[${configColors.backgroundColorHeader}] aso-ring-[${configColors.backgroundColorHeader}]`: `aso-text-[${configColors.textColorOptionsMenu}] aso-ring-[${configColors.textColorOptionsMenu}]`} hover:aso-text-[${configColors.backgroundColorHeader}] hover:aso-ring-[${configColors.backgroundColorHeader}]
                                                    aso-relative aso-cursor-pointer w-auto aso-h-auto aso-px-2 aso-w-full aso-p-3 xl:aso-px-4 aso-rounded-md  xl:aso-space-y-3 aso-ring-2 aso-flex aso-flex-col aso-justify-center xl:aso-justify-start aso-transition-all aso-duration-500 aso-ease-in-out`"
                                                >                           
                                                    <div class="aso-text-base lg:aso-text-sm xl:aso-text-md aso-font-medium aso-flex aso-justify-center aso-items-center">
                                                        <p class="lowercase first-letter:uppercase">{{option.inputs.no}}</p>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                        <div v-show="showYesNo && yesNoIndex == indexx" :class="`aso-bg-[${configColors.backgroundColorOptionsMenu}] aso-text-[${configColors.backgroundColorHeader}] aso-absolute aso-top-0 aso-right-0 aso-translate-y-[-50%] lg:aso-translate-y-[0%] lg:aso-translate-x-[101%] aso-w-[85%] aso-h-fit aso-p-2 aso-z-10`">
                                            <div :class="`aso-cursor-pointer aso-flex aso-items-center aso-justify-center aso-bg-[${configColors.backgroundColorHeader}] aso-text-[${configColors.textColorContentHeader}] aso-absolute aso-right-0 aso-top-0 aso-p-1`" @click="()=>showYesNoExample()">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="aso-w-6 aso-h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </div>
                                            <img :src="showYesNoImg" class="aso-w-auto aso-h-full">
                                        </div>
                                    </div>
                                </div>
    
                                <div v-if="option.type == 'image-input'">
                                    <div class="aso-flex aso-flex-col aso-space-y-2 aso-w-full">
                                        <div>
                                            <p :class="`aso-text-[${configColors.backgroundColorHeader}] aso-font-medium lowercase first-letter:uppercase aso-text-[16px]`">{{ option.label }}</p>
                                            <p :class="` aso-text-xs lowercase first-letter:uppercase`">{{ option.description }}</p>
                                        </div>
                                        <div v-if="selectedId == indexx" :class="` aso-text-xs`">
                                            {{selectedOption}}
                                        </div>
                                        <div class="aso-grid aso-grid-cols-4 lg:aso-grid-cols-2 xl:aso-grid-cols-4 aso-gap-4">
                                            <div v-for="(element, index) in option.options" class="">
                                                <input type="radio" :id="'aso-image-input'+element.label+index" :name="option.label.toLowerCase().replace(/\s+/g, '-') " class="aso-hidden peer" required @click="()=>{addToOrUpdateArray(customAdditionalValues, indexx, option.label, element.value, element.price); selectOption(element.value, element.price, indexx)}" :price-type="element.price.type" :price-value="element.price.value">
    
                                                <label :for="'aso-image-input'+element.label+index" :class="`${(customAdditionalValues.some(item => item.id === indexx) && customAdditionalValues.some(item => item.value === element.value) )? `aso-text-[${configColors.backgroundColorHeader}] aso-ring-2 aso-ring-[${configColors.backgroundColorHeader}]`: `aso-ring-[${configColors.textColorOptionsMenu}]`} aso-border
                                                    aso-p-0.5 aso-cursor-pointer aso-w-[70px] aso-h-[70px] aso-flex aso-ring-2 aso-rounded-lg aso-overflow-hidden`" 
                                                >
                                                    <div v-if="element.prevImg !==''" class="aso-h-full aso-w-full aso-relative">
                                                        <img class="aso-w-full aso-h-full aso-rounded-lg" :src="element.prevImg" />
                                                        <span v-if="element.popImg !== ''" @click="showInputImageExample(element.popImg, index, element.label)" :class="`aso-cursor-pointer aso-z-1 aso-w-[34px] aso-h-[30px] aso-bottom-0 aso-right-0 aso-absolute aso-bg-[${configColors.backgroundColorHeader}] aso-rounded-tl-[20px] aso-rounded-br-[5px] aso-border border-neutral-400 aso-text-[${configColors.textColorContentHeader}] aso-flex aso-justify-center aso-items-center`">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-8 aso-h-8 aso-p-1.5">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                        </span>
                                                    </div>
                                                    <div v-if="element.prevImg === ''" :class="`aso-p-4 aso-bg-[${element.color}] aso-w-full aso-h-full aso-relative aso-rounded-lg`">
                                                        <span v-if="element.popImg !== ''" @click="showInputImageExample(element.popImg, index, element.label)" :class="`aso-cursor-pointer aso-z-1 aso-w-[34px] aso-h-[30px] aso-bottom-0 aso-right-0 aso-absolute aso-bg-[${configColors.backgroundColorHeader}] aso-rounded-tl-[20px] aso-rounded-br-[5px] aso-border border-neutral-400 aso-text-[${configColors.textColorContentHeader}] aso-flex aso-justify-center aso-items-center`">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-8 aso-h-8 aso-p-1.5">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                        </span>
                                                    </div>
                                                </label>
                                                <div v-show="inputImageExample && inputImageIndex == index && inputImageLabel == element.label" :class="`aso-bg-[${configColors.backgroundColorOptionsMenu}] aso-text-[${configColors.backgroundColorHeader}] aso-absolute aso-top-0 aso-right-0 aso-translate-y-[-50%] lg:aso-translate-y-[0%] lg:aso-translate-x-[101%] aso-w-[85%] aso-h-fit aso-p-2 aso-z-10`">
                                                    <div :class="`aso-cursor-pointer aso-flex aso-items-center aso-justify-center aso-bg-[${configColors.backgroundColorHeader}] aso-text-[${configColors.textColorContentHeader}] aso aso-absolute aso-right-0 aso-top-0 aso-p-1`" @click="showInputImageExample()">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="aso-w-6 aso-h-6">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </div>
                                                    <img :src="inputImageImg" class="aso-w-full aso-h-full">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
    
                                <div v-if="option.type == 'dropdown'" class="aso-space-y-4">
                                    <div class="aso-space-y-2 aso-w-full">
                                        <div class="aso-flex aso-justify-between aso-items-center aso-space-x-3">
                                            <div>
                                                <p :class="`aso-text-[${configColors.backgroundColorHeader}] aso-font-medium lowercase first-letter:uppercase aso-text-[16px]`">{{ option.label }}</p>
                                                <p :class="` aso-text-xs lowercase first-letter:uppercase`">{{ option.description }}</p>
                                            </div>
                                            <div>
                                                <span v-show="dropdownExampleImg != ''" @click="()=>showDropdownExample()" :class="`aso-text-[${configColors.backgroundColorHeader}] aso-cursor-pointer aso-flex underline aso-text-base aso-font-medium p-1 aso-px-2 aso-transition-all aso-duration-500 aso-ease-in-out aso-rounded-lg`">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                        <select id="" class="aso-w-full aso-p-2 aso-border-[1.5px] border-zinc-400 aso-rounded-lg aso-text-base" :name="option.label.toLowerCase().replace(/\s+/g, '-') " @change="(e)=>{addToOrUpdateArray(customAdditionalValues, indexx, option.label, dropdownValue.value, dropdownValue.price), dropdownExampleImg = e.target.options[e.target.selectedIndex].getAttribute('popImg')}" v-model="dropdownValue">
                                            <option v-for="(element, indx) in option.options" :value="element" :priceType="element.price.type" :priceValue="element.price.value" :popImg="element.popImg">
                                                {{element.label}}
                                                <span v-if="element.price.type == 'base'">(+{{ currentDevise }}{{ element.price.value }})</span>
                                                <span v-if="element.price.type == 'multiplier'">(+{{ element.price.value }}%)</span> 
                                            </option>
                                        </select>
    
                                        <div v-show="dropdownExample && dropdownIndex == indexx && dropdownExampleImg != ''" :class="`aso-bg-[${configColors.backgroundColorOptionsMenu}] aso-text-[${configColors.backgroundColorHeader}] aso-absolute aso-top-0 aso-right-0 aso-translate-y-[-50%] lg:aso-translate-y-[0%] lg:aso-translate-x-[101%] aso-w-[85%] aso-h-fit aso-p-2 aso-z-10`">
                                            <div :class="`aso-cursor-pointer aso-flex aso-items-center aso-justify-center aso-bg-[${configColors.backgroundColorHeader}] aso-text-[${configColors.textColorContentHeader}] aso-absolute aso-right-0 aso-top-0 aso-p-1`" @click="()=>showDropdownExample()">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="aso-w-6 aso-h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </div>
                                            <img :src="dropdownExampleImg" class="aso-w-full aso-h-full">
                                        </div>
                                    </div>
                                </div>
    
                                <div v-if="option.type == 'note'">
                                    <div class="aso-flex aso-flex-col aso-space-y-2 aso-w-full">
                                        <div class="aso-flex aso-flex-col aso-w-full">
                                            <p :class="`aso-text-[${configColors.backgroundColorHeader}] aso-font-medium lowercase first-letter:uppercase aso-text-[16px]`">{{ option.label }}</p>
                                            <p :class="` aso-text-xs lowercase first-letter:uppercase`">{{ option.description }}</p>
                                        </div>                        
                                        <div class="aso-w-full">
                                            <textarea  @input="(e)=>addToOrUpdateArray(customAdditionalValues, indexx, option.label, e.target.value)"  :maxlength="option.noteLimitChar" :name="option.label.toLowerCase().replace(/\s+/g, '-') " id="" cols="20" rows="10" class="aso-w-full aso-h-[113px] aso-rounded-md aso-border aso-border-gray-400 aso-p-4" ></textarea>
                                        </div>
                                        <div v-show="noteValue.length == option.noteLimitChar"  :class="`aso-text-xs lg:aso-text-sm aso-p-2 aso-bg-[${configColors.backgroundColorHeader}] aso-text-[${configColors.backgroundColorHeader}]`"> La limite de caratcère est atteinte </div>
                                    </div>
                                </div>
    
                                <div v-if="option.type == 'include-type'" >
                                    <div class="aso-relative aso-flex aso-space-x-3 aso-justify-between aso-w-full">
                                        <div>
                                            <p :class="`aso-text-[${configColors.backgroundColorHeader}] aso-flex space-x-2 aso-font-medium aso-text-[16px]`">
                                                <span class="aso-lowercase first-letter:aso-uppercase">
                                                    {{ option.label }}
                                                </span> 
                                                <span v-if="option.price.type == 'base'">(+{{ currentDevise }}{{ option.price.value }})</span>
                                                <span v-if="option.price.type == 'multiplier'">(+{{ option.price.value }}%)</span>
                                                <span :class="`aso-text-[${configColors.backgroundColorHeader}] aso-flex aso-w-fit aso-items-center aso-justify-center aso-px-2 aso-p-0.5 aso-rounded-lg`">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-5 aso-h-5">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                                    </svg>
                                                </span>
                                            </p>
                                            <p :class="` aso-text-xs aso-lowercase first-letter:aso-uppercase`">{{ option.description }}</p>
                                        </div>
                                        <div>
                                            <span v-if="option.popImg != ''" @click="()=>showFreeExample(option.popImg, indexx)" :class="`aso-text-[${configColors.backgroundColorHeader}] aso-cursor-pointer aso-flex underline aso-text-base aso-font-medium aso-p-1 aso-px-2 aso-transition-all aso-duration-500 aso-ease-in-out aso-rounded-lg`">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </span>
                                        </div>                     
                                        <div v-if="showFree && freeIndex == indexx" :class="`aso-bg-[${configColors.backgroundColorHeader}] aso-text-[${configColors.backgroundColorHeader}] aso-absolute aso-bottom-[0%] aso-right-[0%] aso-w-[75%] aso-h-auto aso-p-2 aso-z-10`">
                                            <span :class="`aso-cursor-pointer aso-flex aso-items-center aso-justify-center aso-bg-[${configColors.backgroundColorHeader}] aso-absolute aso-right-0 aso-top-0 aso-p-1`" @click="()=>showFreeExample()">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="aso-w-6 aso-h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </span>
                                            <img :src="showFreeImg" class="aso-w-full aso-h-full">
                                        </div>
                                    </div>
                                </div>                               
                            </div>
                        </div>
                    </div>
                </div>
    
                <div class="aso-w-full aso-flex lg:aso-hidden aso-h-[15%] aso-bg-red-400">
                    <div :class="`aso-w-1/2 aso-h-full aso-flex aso-full-center aso-bg-[${configColors.backgroundButton}] hover:aso-bg-[${configColors.backgroundColorHoverButton}] aso-text-[${configColors.textColorButton}] hover:aso-text-[${configColors.textColorHoverButton}]`">
                        Cancel
                    </div>
                    <button @click="finishConfig()" :class="`aso-w-1/2 aso-h-full aso-flex aso-full-center aso-bg-[${configColors.backgroundColorButtonFinish}] aso-text-[${configColors.textColorButtonFinish}] hover:aso-bg-[${configColors.backgroundColorHoverButtonFinish}] hover:aso-text-[${configColors.textColorHoverButtonFinish}]`">
                        {{ configVisualiserTexts.textButtonFinish && configVisualiserTexts.textButtonFinish.trim() !== '' ? configVisualiserTexts.textButtonFinish : 'Finish' }}
                    </button>
                </div>
            </div>
    
            <div v-if="showImg" class="aso-absolute aso-top-[20%] lg:aso-top-[50%] aso-translate-y-[-50%] aso-left-[50%] aso-translate-x-[-50%] aso-w-[80%] lg:aso-h-[80%] aso-flex aso-full-center aso-bg-white aso-border-solid aso-p-2">
                <svg @click="closeprevImg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6 aso-absolute aso-top-0 aso-right-0">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
    
                <img id="showPreview" :src="prevImg" class="aso-w-full aso-h-auto" />
            </div>
        </div>

            <div v-if="finish" :class="`aso-absolute aso-top-0 aso-z-30 aso-w-full aso-h-full aso-flex aso-flex-col aso-bg-[${configColors.backgroundColorOptionsMenu}] aso-text-[${configColors.textColorOptionsMenu}]`">
                <div :class="`aso-p-4 aso-bg-[${configColors.backgroundColorHeader}] aso-text-[${configColors.textColorContentHeader}]`">
                    <p class="aso-text-xl aso-font-bold aso-text-center">Summary</p>
                </div>

                <div class="aso-flex aso-flex-col aso-flex-1 aso-overflow-auto aso-scrollBar">
                    <div  class="aso-flex aso-items-center aso-justify-between aso-px-4 aso-py-3 aso-border-b-2">
                        <p :class="`aso-text-[16px] aso-font-semibold`">
                            {{ configVisualiserTexts.textPreview && configVisualiserTexts.textPreview.trim() !== '' ? configVisualiserTexts.textPreview : 'Preview' }}
                        </p>

                        <p class="aso-text-[14px] aso-space-y-1 aso-flex aso-flex-col aso-items-center w-2/3 justify-end">
                            <div class="aso-flex aso-space-x-2 aso-full-center">
                                <span v-if="configDoublePart.active"  class="aso-font-medium">{{configDoublePart.part1}}: </span>
                                <img v-if="configDoublePart.active" :src="configData.designImages.face1[0].url" class="aso-w-auto aso-h-[70px]" >
                                <img v-if="!configDoublePart.active" :src="configData.designImages[0].url" class="aso-w-auto aso-h-[70px]" >
                            </div>

                            <div v-if="configDoublePart.active" class="aso-flex aso-space-x-2 aso-full-center">
                                <span class="aso-font-medium">{{configDoublePart.part2}}: </span>
                                <img :src="configData.designImages.face2[0].url" class="aso-w-auto aso-h-[70px]" >
                            </div>
                        </p>
                    </div>
                    
                    <div v-if=" selectedMaterial != '' " class="aso-flex aso-items-center aso-justify-between aso-px-4 aso-py-3 aso-border-b-2">
                        <p :class="`aso-text-[16px] aso-font-semibold`">{{ configVisualiserTexts.textMaterial ?? 'Material' }}</p>
                        <p :class="`aso-text-[14px]`">{{ selectedMaterial}}</p>
                    </div>

                    <div v-if="selectedShape != '' " class="aso-flex aso-items-center aso-justify-between aso-px-4 aso-py-3 aso-border-b-2">
                        <p :class="`aso-text-[16px] aso-font-semibold`">{{ configVisualiserTexts.textShape ?? 'Shape' }}</p>
                        <p :class="`aso-text-[14px] lowercase first-letter:uppercase`">{{selectedShape}}</p>
                    </div>

                    <div v-if="currentSizeName != '' " class="aso-flex aso-items-center aso-justify-between aso-px-4 aso-py-3 aso-border-b-2">
                        <div :class="``">
                            <p v-if="configVisualiserTexts.textSize" class="aso-text-[16px] aso-font-semibold">{{configVisualiserTexts.textSize}}</p>
                            <p v-if="!configVisualiserTexts.textSize" class="aso-text-[16px] aso-font-semibold">Sizes</p>
                        </div>
                        <div :class="`aso-flex aso-flex-col`"> 
                            <p class="aso-text-[13px]" v-show="configSettings.customizerSign.customizerOptions.showHideMeasurements === 'both' || configSettings.value.customizerSign.customizerOptions.showHideMeasurements === 'only-height'"><span class="aso-font-semibold">{{ configVisualiserTexts.textHeight && configVisualiserTexts.textHeight.trim() !== '' ? configVisualiserTexts.textHeight : 'Height' }}: </span> 
                                <span>
                                    {{configData.sign.size.value.height.value}}
                                </span>
                            </p>
                            <p class="aso-text-[13px]" v-show="configSettings.customizerSign.customizerOptions.showHideMeasurements === 'both' || configSettings.value.customizerSign.customizerOptions.showHideMeasurements === 'only-width'"><span class="aso-font-semibold">{{ configVisualiserTexts.textWidth && configVisualiserTexts.textWidth.trim() !== '' ? configVisualiserTexts.textWidth : 'Width' }}: </span> 
                                <span>
                                    {{configData.sign.size.value.width.value}}
                                </span>
                            </p>
                            <p class="aso-text-[13px]" v-if="materialType === 'simple' && thicknesss.active"><span class="aso-font-semibold">{{configVisualiserTexts.thickness}}: </span> 
                                <span>
                                    {{currentThickValue}} {{configUnit}}
                                </span>
                            </p>
                        </div>
                    </div>

                    <div v-if="activeSignColor != '' " class="aso-flex aso-items-center aso-justify-between aso-px-4 aso-py-3 aso-border-b-2">
                        <div :class="`aso-w-1/3`">
                            <p v-if="configVisualiserTexts.textColor" class="aso-text-[16px] text-black aso-font-semibold">{{configVisualiserTexts.textColor}}</p>
                            <p v-if="!configVisualiserTexts.textColor" class="aso-text-[16px] text-black aso-font-semibold">Color</p>
                        </div>
                        <p class="aso-text-[14px] aso-space-y-1 aso-flex aso-flex-col aso-items-center w-2/3 justify-end">
                            <div class="aso-flex aso-space-x-2 aso-full-center">
                                <span v-if="configDoublePart.active"  class="aso-font-medium">{{configDoublePart.part1}}: </span>
                                <span class="lowercase first-letter:uppercase">{{activeSignColor}}</span>
                                <span :class="`aso-h-fit aso-w-fit aso-p-[1px] aso-border aso-border-[${configColors.backgroundColorHeader}]`">
                                    <span v-if="!patternActive1" :class="`aso-h-[35px] aso-w-[35px] aso-p-4 aso-bg-[${activeSignColorCode1}] aso-flex`"></span>
                                    <img v-if="patternActive1" :src="activeSignColorCode1" class="aso-w-[35px] aso-h-[35px]" />
                                </span>

                                <span v-if="signTextColor1.active" class="lowercase first-letter:uppercase">{{colorTextColorName1}}</span>
                                <span :class="`aso-h-fit aso-w-fit aso-p-[1px] aso-border aso-border-[${configColors.backgroundColorHeader}]`">
                                    <span v-if="signTextColor1.active" :class="`aso-h-[35px] aso-w-[35px] aso-p-4 aso-bg-[${colorTextCodeHex1}] aso-flex`"></span>
                                </span>
                            </div>

                            <div v-if="configDoublePart.active" class="aso-flex aso-space-x-2 aso-full-center">
                                <span class="aso-font-medium">{{configDoublePart.part2}}: </span>
                                <span class="lowercase first-letter:uppercase">{{activeSignFace2Color}}</span>
                                <span :class="`aso-h-fit aso-w-fit aso-p-[1px] aso-border aso-border-[${configColors.backgroundColorHeader}]`">
                                    <span v-if="!patternActive2" :class="`aso-h-[35px] aso-w-[35px] aso-p-4 aso-bg-[${activeSignColorCode2}] aso-flex`"></span>
                                    <img v-if="patternActive2" :src="activeSignColorCode1" class="aso-w-[35px] aso-h-[35px]" />
                                </span>
                                
                                <span v-if="signTextColor2.active" class="lowercase first-letter:uppercase">{{colorTextColorName2}}</span>
                                <span :class="`aso-h-fit aso-w-fit aso-p-[1px] aso-border aso-border-[${configColors.backgroundColorHeader}]`">
                                    <span v-if="signTextColor2.active" :class="`aso-h-[35px] aso-w-[35px] aso-p-4 aso-bg-[${colorTextCodeHex2}] aso-flex`"></span>
                                </span>
                            </div>
                        </p>
                    </div>

                    <div v-if="activeFixingMethode != '' " class="aso-flex aso-items-center aso-justify-between aso-px-4 aso-py-3 aso-border-b-2">
                        <div :class="``">
                            <p v-if="configVisualiserTexts.textFixingMethods" class="aso-text-[16px] aso-font-semibold">{{configVisualiserTexts.textFixingMethods}}</p>
                            <p v-if="!configVisualiserTexts.textFixingMethods" class="aso-text-[16px] aso-font-semibold">Fixing methode</p>
                        </div>
                        <p :class="`aso-text-[15px] lowercase first-letter:uppercase`">{{activeFixingMethode}}</p>
                    </div>

                    <div v-if="materialType === 'simple' && (activeFace1Border != '' || activeFace2Border != '') " class="aso-flex aso-items-center aso-justify-between aso-px-4 aso-py-3 aso-border-b-2">
                        <div :class="`aso-w-1/3`">
                            <p v-if="configVisualiserTexts.textBorder" class="aso-text-[16px] text-black aso-font-semibold">{{configVisualiserTexts.textBorder}}</p>
                            <p v-if="!configVisualiserTexts.textBorder" class="aso-text-[16px] text-black aso-font-semibold">Border</p>
                        </div>
                        <p class="aso-text-[14px] aso-space-y-1 aso-flex aso-flex-col aso-items-center w-2/3 justify-end">
                            <div class="aso-flex aso-space-x-2 aso-full-center">
                                <span v-if="configDoublePart.active"  class="aso-font-medium">{{configDoublePart.part1}}: </span>
                                <span class="lowercase first-letter:uppercase">{{activeFace1Border}}</span>

                                <div v-if="activeFace1Border !== 'none' && (signTextColor1.active && !colorForBorder1)" class="aso-flex aso-space-x-1 aso-full-center">
                                    <span class="lowercase first-letter:uppercase">color: {{colorTextColorName1}}</span>
                                    <span :class="`aso-h-fit aso-w-fit aso-p-[1px] aso-border aso-border-[${configColors.backgroundColorHeader}]`">
                                        <span v-if="!configDoublePart.active" :class="`aso-h-[35px] aso-w-[35px] aso-p-4 aso-bg-[${configData.sign.border.codeHex}] aso-flex`"></span>
                                        <span v-if="configDoublePart.active" :class="`aso-h-[35px] aso-w-[35px] aso-p-4 aso-bg-[${configData.sign.border.value.face1.codeHex}] aso-flex`"></span>
                                    </span>
                                </div>

                                <div v-if="activeFace1Border !== 'none' && colorForBorder1" class="aso-flex aso-space-x-1 aso-full-center">
                                    <span class="lowercase first-letter:uppercase">color: {{borderColorName1}}</span>
                                    <span :class="`aso-h-fit aso-w-fit aso-p-[1px] aso-border aso-border-[${configColors.backgroundColorHeader}]`">
                                        <span v-if="!configDoublePart.active" :class="`aso-h-[35px] aso-w-[35px] aso-p-4 aso-bg-[${configData.sign.border.codeHex}] aso-flex`"></span>
                                        <span v-if="configDoublePart.active" :class="`aso-h-[35px] aso-w-[35px] aso-p-4 aso-bg-[${configData.sign.border.value.face1.codeHex}] aso-flex`"></span>
                                    </span>
                                </div>
                            </div>

                            <div v-if="configDoublePart.active" class="aso-flex aso-space-x-2 aso-full-center">
                                <span class="aso-font-medium">{{configDoublePart.part2}}: </span>
                                <span class="lowercase first-letter:uppercase">{{activeFace2Border}}</span>
                            
                                <div v-if="activeFace2Border !== 'none' && (signTextColor2.active && !colorForBorder2)" class="aso-flex aso-space-x-1 aso-full-center">
                                    <span class="lowercase first-letter:uppercase">color: {{colorTextColorName2}}</span>    
                                    <span :class="`aso-h-fit aso-w-fit aso-p-[1px] aso-border aso-border-[${configColors.backgroundColorHeader}]`">
                                        <span :class="`aso-h-[35px] aso-w-[35px] aso-p-4 aso-bg-[${configData.sign.border.value.face2.codeHex}] aso-flex`"></span>
                                    </span>
                                </div>

                                <div v-if="activeFace2Border !== 'none' && colorForBorder2" class="aso-flex aso-space-x-1 aso-full-center">
                                    <span class="lowercase first-letter:uppercase">color: {{borderColorName2}}</span>
                                    <span :class="`aso-h-fit aso-w-fit aso-p-[1px] aso-border aso-border-[${configColors.backgroundColorHeader}]`">
                                        <span :class="`aso-h-[35px] aso-w-[35px] aso-p-4 aso-bg-[${configData.sign.border.value.face2.codeHex}] aso-flex`"></span>
                                    </span>
                                </div>
                            </div>
                        </p>
                    </div>

                    <div v-if="materialType === 'simple' && addComponentSelected.length > 0" class="aso-flex aso-items-center aso-justify-between aso-px-4 aso-py-3 aso-border-b-2" v-for="(option, index) in addComponentSelected">
                        <p :class="`aso-text-[16px] aso-font-semibold`">{{option.option}}</p>
                        <p :class="`aso-text-[14px] lowercase first-letter:uppercase`">{{ option.value }}</p>
                    </div>

                    <div v-if="(!configDoublePart.active && configData.texts.value.length > 0) || (configDoublePart.active && (configData.texts.value.face1.length > 0 || configData.texts.value.face2.length > 0))" class="aso-flex aso-items-center aso-justify-between aso-px-4 aso-py-3 aso-border-b-2">
                        <div :class="`aso-w-1/3`">
                            <p v-if="configVisualiserTexts.textOptionText" class="aso-text-[16px] text-black aso-font-semibold">{{configVisualiserTexts.textOptionText}}</p>
                            <p v-if="!configVisualiserTexts.textOptionText" class="aso-text-[16px] text-black aso-font-semibold">Text</p>
                        </div>
                        
                        <div class="aso-text-[14px] aso-space-y-1 aso-flex aso-flex-col aso-items-center w-2/3 justify-end">
                            <div v-if="!configDoublePart.active && configData.texts.value.length > 0">
                                <div v-for="(text, id) in configData.texts.value">
                                    {{text.textContent}} : {{text.values.width.value}} {{configSettings.customizerSign.customizerOptions.measurementUnit}} x {{text.values.height.value}} {{configSettings.customizerSign.customizerOptions.measurementUnit}}
                                </div>
                            </div>

                            <div v-if="configDoublePart.active">
                                <div v-if="configData.texts.value.face1.length > 0">
                                    <span v-if="configDoublePart.active"  class="aso-font-medium">{{configDoublePart.part1}}: </span>
                                    <div v-for="(text, id) in configData.texts.value.face1">
                                        <!-- {{text}} -->
                                        {{text.textContent}} : {{text.values.width.value}} {{configSettings.customizerSign.customizerOptions.measurementUnit}} x {{text.values.height.value}} {{configSettings.customizerSign.customizerOptions.measurementUnit}}
                                    </div>
                                </div>

                                <div v-if="configDoublePart.active && configData.texts.value.face2.length > 0">
                                    <span class="aso-font-medium">{{configDoublePart.part2}}: </span>
                                    <div v-for="(text, id) in configData.texts.value.face2">
                                        {{text.textContent}} : {{text.values.width.value}} {{configSettings.customizerSign.customizerOptions.measurementUnit}} x {{text.values.height.value}} {{configSettings.customizerSign.customizerOptions.measurementUnit}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="(!configDoublePart.active && configData.images.value.length > 0) || (configDoublePart.active && (configData.images.value.face1.length > 0 || configData.images.value.face2.length > 0))" class="aso-flex aso-items-center aso-justify-between aso-px-4 aso-py-3 aso-border-b-2">
                        <div :class="`aso-w-1/3`">
                            <p v-if="configVisualiserTexts.textImage" class="aso-text-[16px] text-black aso-font-semibold">{{configVisualiserTexts.textImage}}</p>
                            <p v-if="!configVisualiserTexts.textImage" class="aso-text-[16px] text-black aso-font-semibold">Text</p>
                        </div>
                        
                        <div class="aso-text-[14px] aso-space-y-1 aso-flex aso-flex-col aso-items-center w-2/3 justify-end">
                            <div v-if="!configDoublePart.active && configData.images.value.length > 0">
                                <div v-for="(image, id) in configData.images.value" class="aso-flex aso-space-x-1 aso-full-center">
                                    <span :class="`aso-h-fit aso-w-fit aso-p-[1px] aso-border aso-border-[${configColors.backgroundColorHeader}]`">
                                        <img :src="image.url" :class="`aso-h-[40px] aso-w-[40px] aso-flex`" />
                                    </span>
                                    <span>
                                        <p>{{image.values.width.value}} {{configSettings.customizerSign.customizerOptions.measurementUnit}} x {{image.values.height.value}} {{configSettings.customizerSign.customizerOptions.measurementUnit}}</p>
                                    </span>
                                </div>
                            </div>

                            <div v-if="configDoublePart.active">
                                <div v-if="configData.images.value.face1.length > 0">
                                    <span v-if="configDoublePart.active"  class="aso-font-medium">{{configDoublePart.part1}}: </span>
                                    <div v-for="(image, id) in configData.images.value.face1" class="aso-flex aso-space-x-1 aso-full-center">                              
                                        <span :class="`aso-h-fit aso-w-fit aso-p-[1px] aso-border aso-border-[${configColors.backgroundColorHeader}]`">
                                            <img :src="image.url" :class="`aso-h-[40px] aso-w-[40px] aso-flex`" />
                                        </span>
                                        <span>
                                            <p>{{image.values.width.value}} {{configSettings.customizerSign.customizerOptions.measurementUnit}} x {{image.values.height.value}} {{configSettings.customizerSign.customizerOptions.measurementUnit}}</p>
                                            <!-- <p>top: {{image.top}}</p>
                                            <p>bottom: {{image.bottom}}</p>
                                            <p>left: {{image.left}}</p>
                                            <p>right: {{image.right}}</p> -->
                                        </span>
                                    </div>
                                </div>

                                <div v-if="configDoublePart.active && configData.images.value.face2.length > 0">
                                    <span class="aso-font-medium">{{configDoublePart.part2}}: </span>
                                    <div v-for="(image, id) in configData.images.value.face2" class="aso-flex aso-space-x-1 aso-full-center">
                                        <span :class="`aso-h-fit aso-w-fit aso-p-[1px] aso-border aso-border-[${configColors.backgroundColorHeader}]`">
                                            <img :src="image.url" :class="`aso-h-[40px] aso-w-[40px] aso-flex`" />
                                        </span>
                                        <span>
                                            <p>{{image.values.width.value}} {{configSettings.customizerSign.customizerOptions.measurementUnit}} x {{image.values.height.value}} {{configSettings.customizerSign.customizerOptions.measurementUnit.value}}</p>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="customAdditionalValues != [] " class="aso-flex aso-items-center aso-justify-between aso-px-4 aso-py-3 aso-border-b-2" v-for="(option, index) in customAdditionalValues">
                        <p :class="`aso-text-[16px] aso-font-semibold`">{{option.label}}</p>
                        <p :class="`aso-text-[14px] lowercase first-letter:uppercase`">{{ option.value }}</p>
                    </div>
                </div>

                <div class="aso-w-full aso-h-[8%] aso-flex aso-text-[16px] aso-leading-normal">
                    <button :disabled="isAddingToCart" @click="() => finish = false" :class="`aso-w-1/2 aso-h-full aso-bg-[${configColors.backgroundButton}] hover:aso-bg-[${configColors.backgroundColorHoverButton}] aso-text-[${configColors.textColorButton}] hover:aso-text-[${configColors.textColorHoverButton}] aso-flex aso-full-center aso-base-animation aso-cursor-pointer`" >
                        {{ configVisualiserTexts.textCanvasEdit && configVisualiserTexts.textCanvasEdit.trim() !== '' ? configVisualiserTexts.textCanvasEdit : 'Finish' }}
                    </button>
                    <button :disabled="isAddingToCart" @click="addToCart" :class="`aso-w-1/2 aso-h-full aso-bg-[${configColors.backgroundColorButtonFinish}] aso-text-[${configColors.textColorButtonFinish}] hover:aso-bg-[${configColors.backgroundColorHoverButtonFinish}] hover:aso-text-[${configColors.textColorHoverButtonFinish}] aso-flex aso-full-center aso-base-animation aso-cursor-pointer`" >
                        <img :src="`${getAsoUrl()}/assets/icons/ic_loading_gray.svg`" class="aso-w-5 aso-h-5" v-if="isAddingToCart"/>
                        {{ configVisualiserTexts.textAddToCart && configVisualiserTexts.textAddToCart.trim() !== '' ? configVisualiserTexts.textAddToCart : 'Finish' }}
                    </button>
                </div>
            </div>

        <div v-if="resetAllBool" :class="`aso-absolute aso-top-0 aso-bg-[${configColors.backgroundColorHeader}]/70 aso aso-w-full aso-h-full aso-flex aso-full-center`">
            <div :class="`aso-w-[40%] aso-h-[40%] aso-bg-[${configColors.backgroundColorOptionsMenu}] aso-text-[${configColors.textColorOptionsMenu}] aso-p-2 aso-shadow-2xl`">
                <div class="aso-h-[70%] aso-flex aso-full-center aso-font-medium aso-text-lg">
                    Reset all for real ??
                </div>
                <div class="aso-h-[30%] aso-flex aso-items-center aso-justify-between">
                    <div @click="clearAll" :class="`aso-bg-[${configColors.backgroundButton}] hover:aso-bg-[${configColors.backgroundColorHoverButton}] aso-text-[${configColors.textColorButton}] hover:aso-text-[${configColors.textColorHoverButton}] aso-px-6 aso-p-2 aso-rounded-md aso-cursor-pointer aso-base-animation`">Yes</div>
                    <div @click="confirmResetAll(false)" :class="`aso-bg-red-400 hover:aso-bg-red-600 aso-text-white hover:aso-text-white/80 aso-px-6 aso-p-2 aso-rounded-md aso-cursor-pointer aso-base-animation`">No</div>
                </div>
            </div>
        </div>


    </div>
</template>

<script setup>
    import { ref, onMounted, defineProps } from 'vue';
    // import {handleReadyToSaveState, 
    //     handleGetCanvas, handleGetCurrentUnit,
    //     handleGetDefaultText,
    //     handleUndo,
    //     handleRedo,
    //     handleClearAll,
    //     handleGetObjectByName,
    //     handleChangeSize,
    //     handleChangeThickness,
    //     handleDeleteObject,
    //     handleCloneObject,
    //     handleCenterVertically,
    //     handleCenterHorizontally,
    //     handlechangeBorderColor,
    //     handleSelectBorder,
    //     handleGetBorderRestart,
    //     handleChangeSignColor,
    //     handleGetShape,
    //     handleSelectShape,
    //     handleGetActiveFixing,
    //     handleSelectFixingMethode,
    //     handleGetAddedTextValues,
    //     handleAddTextToSign,
    //     handleChangeTextValue,
    //     handleChangeTextAlign,
    //     handleChangeTextWeight,
    //     handleChangeTextStyle,
    //     handleChangeTextSize,
    //     handleChangeTextFontFam,
    //     handleChangeTextColor,
    //     handleUnderlineText,
    //     handleCrossText,
    //     handleOverlineText,
    //     handleGetImageSettings,
    //     handleGetAddedImageValues,
    //     handleAddImageToSign,
    //     handleTurnImageLeft,
    //     handleTurnRightImage,
    //     handleChangeImageWidth,
    //     handleChangeImageHeight,
    //     handleFlipImage,
    //     handleSelectFilter,
    //     handleCheckActiveSignFace,
    //     handleCloneCanvas,
    //     setPattern,
    //     handleSetImageToSignBackground,
    //     handleFinishConfiguration,
    //     handleGetCharPrice,
    //     handleSetPrice,
    //     handleClipAddedObject,
    //     handleGetNewPosition
    // } from '@/frontend/utils/aso-editor-script.js';
    // import { add_to_cart, formatPrice, setScrollColor } from '@/frontend/utils/functions.js'


    async function add_to_cart(cart_data,redirectToCheckOut) {
        console.log("try to add to cart");
        return await add_to_cart_shopify( cart_data, redirectToCheckOut);
    }

    function setScrollColor(color) {
        return  setScrollColor_shopify(color);
    }

    function formatPrice(price) {
        return formatPrice_shopify(price);
    }

    function getAsoUrl(){
        return getAsoUrl_shopify()||"";
    }

    const props = defineProps({
        config:Object,
        manage:Object,
        currency:String
    });
    var configColors = ref({})

    var configSettings = ref({})
    var configDoublePart = ref({})
    var configTextSettings = ref({})
    var configTextFontSettings = ref({})
    var configImageSettings = ref({})
    var configImagesFormat = ref("")
    var configImageSettingsClipart = ref({})
    var configImageSettingsFilters = ref({})
    var configUnit = ref("")
    var configSectionIcons = ref({})
    var configOutputSettings = ref({})
    var configAdditionnalOptions = ref([])
    var configVisualiserTexts = ref({})

    // console.log(props.config.data)

    var isLoaded = ref(true)
    function setIsLoadedToFalse() {
        setTimeout(() => {
            isLoaded.value = false;
        }, 1000);
    };

    var div = document.getElementById('canvas-container')


    var showOption = ref(false);
    var step = ref('');
    function closeOption(){
        showOption.value = false;
        step.value = '';
    }

    const handleDocumentClick = (e) => {
        var optionss = document.querySelector('#aso-options-container')
        var optionButton = document.querySelector('#aso-optionsButtons-container')
        if(window.innerWidth > 688){
            if(!optionss.contains(e.target) && !optionButton.contains(e.target)) {
                closeOption()
                selectText.value = false;
                editImage.value = false;
            }
        }
    }

    var selectText = ref(false);
    var editImage = ref(false);

    var advancedComponent = ref({})
    var advancedComponentId = ref(0)
    var addComponentValue = ref({})
    var addComponentId = ref(0)
    function showOptions(option, stepValue, id){
        switch (option) {
            case 'fixing-methode':
                if(fixinggs.value.length > 0){
                    step.value = option;
                    showOption.value = true;
                }
            break;

            case 'material':
                if(props.config.data.materials.length > 0){
                    step.value = option;
                    showOption.value = true;
                }
            break;

            case "size":
                if(sizees.value.length > 0 || customSizeActive){
                    step.value = option;
                    showOption.value = true;
                }
            break;

            case "shape":
                if(shapees.value.length > 0){
                    step.value = option;
                    showOption.value = true;
                }
                
            break;

            case "border":
                if(borderrs.value.allBorders.length > 0){
                    step.value = option;
                    showOption.value = true;
                }
            break;

            case "color":
                // if(colorrs.value.allColors.length >= 0){
                // }
                step.value = option;
                showOption.value = true;
            break;

            case "text":
                // if(currentMaterialTextImages.value.enableText){
                // }
                // if((materialType == 'simple' && currentMaterialTextImages.enableText && sizees.length > 0 ) || materialType == 'advance'){
                // }
                step.value = option;
                showOption.value = true;
            break;

            case "image":
                // if(currentMaterialTextImages.value.enableImage){
                // }
                step.value = option;
                showOption.value = true;
            break;

            case "add-components":
                // if(currentMaterialTextImages.value.enableImage){
                // }
                addComponentId.value = id
                addComponentValue.value = stepValue;
                step.value = option;
                showOption.value = true;
            break;

            case "add-options":
                step.value = option;
                showOption.value = true;
            break;

            case "component":
                if(stepValue && materialType.value == 'advance'){
                    advancedComponentId.value = id
                    advancedComponent.value = stepValue;
                    step.value = option;
                    showOption.value = true;
                }
            break;
        
            default:
                break;
        }

        if(stepValue && materialType.value == 'advance'){
            advancedComponent.value = stepValue;
        }

    }

    // var showScrollButton = ref(false)
    // function verifierScrollabilite() {
    //     const monDiv = document.getElementById('aso-options-buttons');
    //     if (monDiv.scrollWidth > monDiv.clientWidth) {
    //         showScrollButton.value = true;
    //         // monDiv.classList.remove("aso-justify-center");
    //         // monDiv.classList.add("aso-justify-start");
    //     } else {
    //         showScrollButton.value = false;
    //         // monDiv.classList.remove("aso-justify-start");
    //         // monDiv.classList.add("aso-justify-center");
    //     }
    // }
    // function ScrollLeft(id){
    //     var div = document.getElementById(id)
    //     if(isBelowLimit.value === true){
    //         div.scrollLeft -= 150 
    //     }else{
    //         div.scrollTop -= 150 
    //     }
    // }
    // function ScrollRight(id){
    //     var div = document.getElementById(id)
    //     if(isBelowLimit.value === true){
    //         div.scrollLeft += 150 
    //     }else{
    //         div.scrollTop += 150 
    //     }
    // }
    // setInterval(verifierScrollabilite, 500);

    var isBelowLimit = ref(false)
    function checkScreenView() {
        if(window.innerWidth < 1024){
            // isBelowLimits.value = window.innerWidth < 1024;
            if(window.innerWidth < 688){
                isBelowLimit.value = true;
                showOptions('material')
            }
        }else{
            isBelowLimit.value = false
            // firstResize((currentResizeSetting.value), 'desktop'); 
        }
    }

    var showFont = ref(false)
    function dropFontToggle(){
        showFont.value = !showFont.value;
    }

    var showSize = ref(false)
    function dropSizeToggle(){
        console.log('drop')
        showSize.value = !showSize.value;
    }

    var showThick = ref(false)
    function dropThicknessToggle(){
        showThick.value = !showThick.value;
    }

    var pickedColor = ref("aa")
    var simpleColor = ref("#000000");

    var fabric = window.fabric;

    var canvasFace1Ref = ref(null);
    var canvasFace2Ref = ref(null);
    var canvas = null
    var canvasBack = null
    var activeCanvas = null

    var defaultShadow = ref(new fabric.Shadow({
        color: 'black',
        offsetX: 3,
        offsetY: 3,
        blur: 30,
        isActive: true
    }))

    function getCanvas(canvas1, canvas2, statut){
        handleGetCanvas(canvas1, canvas2, statut)
    }

    onMounted(() => {
        configColors.value = props.config.data.settings.themeColors.colors
        configSettings.value = props.config.data.settings
        configDoublePart.value = props.config.data.settings.customizerSign.signPart.doublePart

        // allSizes.value = props.manage.manageSize
        allMaterials.value = props.config.data.materials
        allShapes.value = props.manage.allShapes
        allFixings.value = props.manage.allFixingMethod
        allColors.value = props.manage.colors
        allBorders.value = props.manage.allBorder
        allFonts.value = props.manage.fonts
        allClipart.value = props.manage.cliparts
        
        configTextSettings.value = props.config.data.settings.customizerSign.text
        configTextFontSettings.value = props.config.data.settings.customizerSign.text.enableFontSize
        configImageSettings.value = props.config.data.settings.customizerSign.images
        configImageSettingsClipart.value = props.config.data.settings.customizerSign.images.enableClipart
        configImageSettingsFilters.value = props.config.data.settings.customizerSign.images.filter
        configSectionIcons.value = props.config.data.settings.languageImages.images
        configOutputSettings.value = props.config.data.settings.generals.output
        configVisualiserTexts.value = props.config.data.settings.languageImages.visualizer

        customSizeValues.value.label = (configVisualiserTexts.value.customSize && configVisualiserTexts.value.customSize.trim() !== '' ? configVisualiserTexts.value.customSize : 'Custom size')

        configAdditionnalOptions.value = props.config.data.additionalOptions
        
        // console.log(props.config.data.materials[0], "configTextFontSettings")

        let acceptedFormatTable = configImageSettings.value.fileUploadScript.allowedUploadsExtentions.map(element => (element === 'svg' ? 'image/svg+xml' : 'image/' + element));
        configImagesFormat.value = acceptedFormatTable.join(', ');
        // console.log(configImagesFormat.value)

        handleGetImageSettings(configImageSettings.value)
        // console.log(configImageSettings.value)

        handleGetCurrentUnit(configSettings.value.customizerSign.customizerOptions.measurementUnit, configTextFontSettings.value.defaultFontSize, configTextFontSettings.value.minimumFontSize, configTextFontSettings.value.maximumFontSize, (allFonts.value.length > 0 ? allFonts.value[0].label : 'Arial'))
        handleGetDefaultText(
            {
                width: (configVisualiserTexts.value.textWidth && configVisualiserTexts.value.textWidth.trim() !== '' ? configVisualiserTexts.value.textWidth : 'width'),
                height: (configVisualiserTexts.value.textHeight && configVisualiserTexts.value.textHeight.trim() !== '' ? configVisualiserTexts.value.textHeight : 'height'),
                left: (configVisualiserTexts.value.textLeft && configVisualiserTexts.value.textLeft.trim() !== '' ? configVisualiserTexts.value.textLeft : 'Left'),
                top: (configVisualiserTexts.value.textTop && configVisualiserTexts.value.textTop.trim() !== '' ? configVisualiserTexts.value.textTop : 'top'),
                right: (configVisualiserTexts.value.textRight && configVisualiserTexts.value.textRight.trim() !== '' ? configVisualiserTexts.value.textRight : 'right'),
                bottom: (configVisualiserTexts.value.textBottom && configVisualiserTexts.value.textBottom.trim() !== '' ? configVisualiserTexts.value.textBottom : 'bottom'),
            }
        )
        
        fontFamSelected.value = (allFonts.value.length > 0 ? allFonts.value[0].label : 'Arial')
        configUnit.value = configSettings.value.customizerSign.customizerOptions.measurementUnit
        

        var optionss = document.querySelector('#aso-options-container')
        document.addEventListener('click', handleDocumentClick)
        console.log(fabric.version)

        const canvasElementFace1 = canvasFace1Ref.value
        const canvasElementFace2 = canvasFace2Ref.value

        // document.addEventListener("DOMContentLoaded", function() {

            var canvasContainer = document.getElementById("aso-canvas-containers")
            var canvasWidth = canvasContainer.clientWidth;
            var canvasHeight = canvasContainer.clientHeight;

            canvas = new fabric.Canvas(canvasElementFace1,{
                // backgroundColor : "#f5f5f5",
                width: canvasWidth, 
                height: canvasHeight, 
                // selectable: true,
                // hasControls: true,
                interactive: true,
                name: 'front-face'
            });
            canvasBack = new fabric.Canvas(canvasElementFace2,{
                // backgroundColor : "#f5f5f5",
                width: canvasElementFace2.clientWidth, 
                height: canvasElementFace2.clientHeight, 
                // selectable: true,
                // hasControls: true,
                interactive: true,
                name: 'back-face'
            });

            canvas.hoverCursor = 'pointer';
            canvasBack.hoverCursor = 'pointer';

            const rectWidth = 600; 
            const rectHeight = 400; 
            const clipWidth = rectWidth + (rectWidth * 0.3); 
            const clipHeight = rectHeight + (rectHeight * 0.3); 

            const rectLeft = (canvas.width /2) -(rectWidth/2)
            const rectTop = (canvas.height/2) - (rectHeight/2);
            const clipLeft = (canvas.width /2) -(clipWidth/2)
            const clipTop = (canvas.height/2) - (clipHeight/2);

            const rectangle = new fabric.Rect({
                width: rectWidth,
                height: rectHeight,
                fill: '#cfcece', // Couleur du rectangle
                left: rectLeft,
                top: rectTop,
                shadow: defaultShadow.value,
                selectable: false,
                name: 'safeObject',
                originX: 'center',
                originY: 'center',
                id: 0,
            });
            const rectangle2 = new fabric.Rect({
                width: rectWidth,
                height: rectHeight,
                fill: '#cfcece', // Couleur du rectangle
                left: rectLeft,
                top: rectTop,
                shadow: defaultShadow.value,
                selectable: false,
                name: 'safeObject',
                originX: 'center',
                originY: 'center',
                id: 0,
            });
            
            const cnvasClip = new fabric.Rect({
                width: clipWidth ,
                height: clipHeight ,
                left: clipLeft,
                top: clipTop,
            });

            const bodyElement = document.body;
            const computedStyle = getComputedStyle(bodyElement);

            const pageFontFamily = computedStyle.fontFamily

            var hLine = new fabric.Line([(rectangle.left + rectangle.width +20), rectangle.top, (rectangle.left + rectangle.width +20), (rectangle.top + rectangle.height)], {
                stroke: 'black',
                strokeWidth: 2,
                selectable: false,
                name: 'heightLine',
                id: 1, 
                visible: (configSettings.value.customizerSign.customizerOptions.showHideMeasurements === 'both' || configSettings.value.customizerSign.customizerOptions.showHideMeasurements === 'only-height' ? true : false)
            });
            var hValue = new fabric.IText(String(rectHeight),{
                left: (rectangle.left + rectangle.width +10),
                top: rectangle.top + (rectangle.height/2),
                fontSize: 15,
                fontFamily: pageFontFamily,
                fill: 'black',
                name: 'height-value',
                id: 2,
                selectable: false,
                visible: (configSettings.value.customizerSign.customizerOptions.showHideMeasurements === 'both' || configSettings.value.customizerSign.customizerOptions.showHideMeasurements === 'only-height' ? true : false)
            })
            
            var wLine = new fabric.Line([rectangle.left, (rectangle.top+rectangle.height+20), (rectangle.left+rectangle.width+20), (rectangle.top+rectangle.height+20) ], {
                stroke: 'black',
                strokeWidth: 2,
                selectable: false,
                name: 'widthLine',
                id: 3,
                visible: (configSettings.value.customizerSign.customizerOptions.showHideMeasurements === 'both' || configSettings.value.customizerSign.customizerOptions.showHideMeasurements === 'only-width' ? true : false)
            });
            var wValue = new fabric.IText(String(rectWidth),{
                left: rectangle.left + (rectangle.width/2),
                top: rectangle.top + (rectangle.height +10),
                fontSize: 15,
                fontFamily: pageFontFamily,
                fill: 'black',
                name: 'width-value',
                id: 4,
                selectable: false,
                visible: (configSettings.value.customizerSign.customizerOptions.showHideMeasurements === 'both' || configSettings.value.customizerSign.customizerOptions.showHideMeasurements === 'only-width' ? true : false)
            })
            var thickness = new fabric.IText(String(configVisualiserTexts.thickness + ': 1cm'),{
                left: rectangle.left + (rectangle.width/2),
                top: rectangle.top + (rectangle.height +20),
                fontSize: 15,
                fontFamily: pageFontFamily,
                fill: 'black',
                name: 'thickness-value',
                id: 4,
                selectable: false,
            })


            canvas.add(rectangle, hLine, hValue, wLine, wValue, thickness);
            canvasBack.add(rectangle2);
        
            if(configDoublePart.value.active === true){
                getCanvas(canvas, canvasBack, 'double')
            }else{
                getCanvas(canvas, canvasBack, 'simple')
            }
            handleCloneCanvas(canvas, canvasBack)
        
            canvas.selection = false;
            canvasBack.selection = false;
    
    
            selectMaterial(props.config.data.materials[0])
            if(materialType.value === 'simple'){
                selectSimpleFirstValue()
            }
            if(materialType.value === 'advance'){
                selectAdvanceFirstValue()
            }

            fabric.Object.prototype.transparentCorners = false;
            fabric.Object.prototype.cornerColor = 'black';
            fabric.Object.prototype.borderColor = 'black';
            fabric.Object.prototype.cornerStyle = 'circle';
            
            canvas.on('selection:created', showObjectValues);
            canvas.on('selection:cleared', closeObjectValues);
            canvas.on('mouse:down', function(options) {
                var sign = handleGetObjectByName('safeObject');
                canvas.getObjects().forEach(function(obj) {
                    if (obj.name === 'aso-SignText') {
                        if(obj.isEditing){
                            obj.exitEditing();
                        }
                        obj.clipPath = handleClipAddedObject(canvas);
                        canvas.renderAll();
                    }
                    if (obj.name === 'aso-SignImage') {
                        obj.clipPath = handleClipAddedObject(canvas);
                        canvas.renderAll();
                    }
                });
            });

            canvasBack.on('selection:created', showObjectValues);
            canvasBack.on('selection:cleared', closeObjectValues);
            canvasBack.on('mouse:down', function(options) {
                var sign = handleGetObjectByName('safeObject');
                canvasBack.getObjects().forEach(function(obj) {
                    if (obj.name === 'aso-SignText') {
                        if(obj.isEditing){
                            obj.exitEditing();
                        }
                        obj.clipPath = handleClipAddedObject(canvas);
                        canvasBack.renderAll();
                    }
                    if (obj.name === 'aso-SignImage') {
                        obj.clipPath = handleClipAddedObject(canvasBack);
                        canvasBack.renderAll();
                    }
                });
            });
            
            activeCanvas = canvas

            checkScreenSize();
            checkScreenView()
            // centerSign(canvas)
            // centerSign(canvasBack)
            // window.addEventListener('resize', checkScreenSize);

            let resizeTimer;
            window.addEventListener('load', () => {
                checkScreenSize()
                checkScreenView()
                // centerSign(canvas)
                // centerSign(canvasBack)
            });
            window.addEventListener('resize', () => {
                checkScreenView()
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    checkScreenSize()
                    // centerSign(canvas)
                    // centerSign(canvasBack)
                }, 250); // Délai de 250 millisecondes
            });
            
        // });
        
        if(window.innerWidth < 688){
            showOption.value = true
        }
        
        
        // setScrollColor(configColors.value.backgroundColorHeader)
        setIsLoadedToFalse()
        activeCanvas = canvas

        window.dispatchEvent(new Event('resize'));

        return {
            canvas
        }
        
    });

    var matchingFixings = ref([])
    var matchingBorders = ref([])
    var firstSetLoad = ref(false)
    function selectSimpleFirstValue() {
        handleReadyToSaveState(false);
        firstSetLoad.value = false;
        finalPrices.value = 0
        optionsPrices.value = []

        firstBorderCheck.value = true;
        firstBorderColorCheck.value = true;
        firstColorCheck.value = true;




        var stopSize = false
        if(sizees.value.length >0){
            sizees.value.forEach((sizee, id) => {
                if(sizee.isDefault){
                    currentSizeId.value = id
                    stopSize = true
                }
                // if(!sizee.isDefault && !stopSize){
                //     // console.log("change")
                //     changeSize(size, sizee, id)
                //     stopSize = true
                // }
            })
        }else{
            var size ={
                width: 0,
                height: 0
            }
            changeSize(size)
        }
        var stopColor = false
        if(colorrs.value.allColors.length > 0){
            var index = 0
            var haveDefault = false
            while (index < colorrs.value.allColors.length && !haveDefault) {
                if(colorrs.value.allColors[index].isDefault){
                    if(colorrs.value.allColors[index].active){
                        patternActive1.value = true
                        patternActive2.value = true
                        activeSignColorCode1.value = colorrs.value.allColors[index].url
                        activeSignColorCode2.value = colorrs.value.allColors[index].url
                    }else{
                        patternActive1.value = false
                        patternActive2.value = false
                        activeSignColorCode1.value = colorrs.value.allColors[index].codeHex
                        activeSignColorCode2.value = colorrs.value.allColors[index].codeHex
                    }
                    if(colorrs.value.allColors[index].active){
                        colorTextColorName1.value = colorrs.value.allColors[index].name
                        colorTextColorName2.value = colorrs.value.allColors[index].name
                        
                        colorTextCodeHex1.value = colorrs.value.allColors[index].codeHex
                        colorTextCodeHex2.value = colorrs.value.allColors[index].codeHex
                        if(colorrs.value.allColors[index].sameForBorder){
                            colorForBorder1.value = false
                            colorForBorder2.value = false
                        }else{
                            colorForBorder1.value = true
                            colorForBorder2.value = true
                        }
                    }else{
                        colorTextColorName1.value = ''
                        colorTextColorName2.value = ''

                        colorTextCodeHex1.value = ''
                        colorTextCodeHex1.value = ''

                        colorForBorder1.value = true
                        colorForBorder2.value = true
                    }
                    haveDefault = true
                    break;
                }
                index++;
            }
            if(!haveDefault){
                if(colorrs.value.allColors[0].active){
                    patternActive1.value = true
                    patternActive2.value = true
                    activeSignColorCode1.value = colorrs.value.allColors[0].url
                    activeSignColorCode2.value = colorrs.value.allColors[0].url
                }else{
                    patternActive1.value = false
                    patternActive2.value = false
                    activeSignColorCode1.value = colorrs.value.allColors[0].codeHex
                    activeSignColorCode2.value = colorrs.value.allColors[0].codeHex
                }
                if(colorrs.value.allColors[index].active){
                    colorTextColorName1.value = colorrs.value.allColors[0].name
                    colorTextColorName2.value = colorrs.value.allColors[0].name
                    
                    colorTextCodeHex1.value = colorrs.value.allColors[0].codeHex
                    colorTextCodeHex2.value = colorrs.value.allColors[0].codeHex
                    if(colorrs.value.allColors[0].sameForBorder){
                        colorForBorder1.value = false
                        colorForBorder2.value = false
                    }else{
                        colorForBorder1.value = true
                        colorForBorder2.value = true
                    }
                }else{
                    colorTextColorName1.value = ''
                    colorTextColorName2.value = ''

                    colorTextCodeHex1.value = ''
                    colorTextCodeHex1.value = ''

                    colorForBorder1.value = true
                    colorForBorder2.value = true
                }
            }
        }else{
            // changeSignColor(color, colorr)
        }

        var stopBorder = false
        matchingBorders.value = []
        if(borderrs.value.allBorders.length > 0){
            borderrs.value.allBorders.forEach((borderr, id) => {
                allBorders.value.forEach((border, index) => {
                    if(borderr.manageBorderId == index){
                        matchingBorders.value.push({border, borderr})
            // console.log(matchingBorders.value)

                    }
                })
            })
            let index = 0
            var haveDefault = false
            while (index < matchingBorders.value.length && !haveDefault) {
                if(matchingBorders.value[index].borderr.isDefault){
                    // console.log(matchingBorders[index].borderr, "Default")
                    selectBorder(matchingBorders.value[index].border.value, matchingBorders.value[index].borderr.settings, matchingBorders.value[index].borderr.additionalPrice, matchingBorders.value[index].borderr.excludeShapes, matchingBorders.value[index].borderr.excludeSizes, index, true)
                    haveDefault = true
                    break;
                }
                index++;
            }
            if(!haveDefault){
                console.log("first")
                selectBorder(matchingBorders.value[0].border.value, matchingBorders.value[0].borderr.settings, matchingBorders.value[0].borderr.additionalPrice, matchingBorders.value[0].borderr.excludeShapes, matchingBorders.value[0].borderr.excludeSizes, 0, true)
            }
        }else{
        }

        var stopColor = false
        if(colorrs.value.allColors.length > 0){
            var index = 0
            var haveDefault = false
            while (index < colorrs.value.allColors.length && !haveDefault) {
                if(colorrs.value.allColors[index].isDefault){
                    // console.log(colorrs.value.allColors[index], "default")
                    changeSignColor(colorrs.value.allColors[index].name, colorrs.value.allColors[index].pattern, colorrs.value.allColors[index].textColor, colorrs.value.allColors[index].additionalPrice, true )
                    haveDefault = true
                    break;
                }
                index++;
            }
            if(!haveDefault){
                changeSignColor(colorrs.value.allColors[0].name, colorrs.value.allColors[0].pattern, colorrs.value.allColors[0].textColor, colorrs.value.allColors[0].additionalPrice, true )
            }
        }else{
            // changeSignColor(color, colorr)
        }

        // selectedShape.value = shapes.value[0].name
        // handleGetShape(shapes.value[0].name)
        var stopShape = false
        var matchingShapes = []
        if(shapees.value.length >0){
            shapees.value.forEach((shapee, id) => {
                allShapes.value.forEach((shape, index) => {
                    if(shapee.shapeId == index){
                        matchingShapes.push({shape, shapee})
                        // console.log(id, "shapee.shape")
                    }
                })
            })
            let index = 0
            var haveDefault = false
            while (index < matchingShapes.length && !haveDefault) {
                if(matchingShapes[index].shapee.isDefault){
                    selectedShape.value = matchingShapes[index].shape.value
                    currentShapeId.value = index
                    handleGetShape(matchingShapes[index].shape.value)
                    var shapePriceObject = {
                        name: "shape",
                        price: matchingShapes[index].shapee.additionalPrice
                    }
                    getOptionPrice(shapePriceObject)
                    haveDefault = true
                    break;
                }
                index++;
            }
            if(!haveDefault){
                // console.log("first", matchingShapes[0])
                selectedShape.value = matchingShapes[0].shape.value
                currentShapeId.value = 0
                handleGetShape(matchingShapes[0].shape.value)
                var shapePriceObject = {
                    name: "shape",
                    price: matchingShapes[0].shapee.additionalPrice
                }
                getOptionPrice(shapePriceObject)
            }
        }else{
            selectedShape.value = 'square'
            handleGetShape('square')
        }

        var stopFixing = false
        matchingFixings.value = []
        if(fixinggs.value.length > 0){
            fixinggs.value.forEach((fixingg, id) => {
                allFixings.value.forEach((fixing, index) => {
                    if(fixingg.fixingMethodId == index && !fixingg.excludeSizes.includes(currentSizeId) && !fixingg.excludeShapes.includes(currentShapeId)){
                        matchingFixings.value.push({fixing, fixingg})
                    }
                })
            })
            let index = 0
            var haveDefault = false
            while (index < matchingFixings.value.length && !haveDefault) {
                if(matchingFixings.value[index].fixingg.isDefault){
                    handleGetActiveFixing(matchingFixings.value[index].fixing.type)
                    activeFixingMethode.value = matchingFixings.value[index].fixing.type
                    fixingExcludeSizes.value = matchingFixings.value[index].fixingg.excludeSizes
                    fixingExcludeShapes.value = matchingFixings.value[index].fixingg.excludeShapes
                    activeFixingId.value = index

                    var fixingPrice = matchingFixings.value[index].fixingg.additionalPrice
                    var fixingPriceObject = {
                        name: "fixing",
                        price: fixingPrice
                    }
                    getOptionPrice(fixingPriceObject)

                    haveDefault = true
                    break;
                }
                index++;
            }
            if(!haveDefault){
                handleGetActiveFixing(matchingFixings.value[0].fixing.type)
                activeFixingMethode.value = matchingFixings.value[0].fixing.type
                fixingExcludeSizes.value = matchingFixings.value[0].fixingg.excludeSizes
                fixingExcludeShapes.value = matchingFixings.value[0].fixingg.excludeShapes
                activeFixingId.value = 0

                var fixingPrice = matchingFixings.value[0].fixingg.additionalPrice
                var fixingPriceObject = {
                    name: "fixing",
                    price: fixingPrice
                }
                getOptionPrice(fixingPriceObject)

            }
        }else{
            selectFixingMethode('none')
        }

        var stopSize = false
        var matchingSizes = []
        if(sizees.value.length >0){
            var index = 0
            var haveDefault = false
            while (index < sizees.value.length && !haveDefault) {
                if(sizees.value[index].isDefault){
                    var sizeData = {
                        label: sizees.value[index].label,
                        width: sizees.value[index].width,
                        height: sizees.value[index].height,
                        // thickness: (sizees.value[index].thickness.active ? sizees.value[index].thickness : {active: false, value: 0}),
                    };
                    var settings = {
                        textNumber: sizees.value[index].textNumber, 
                        charPrice: sizees.value[index].charPrice,
                        basePrice: sizees.value[index].basePrice,
                        maxTextChar: sizees.value[index].maxTextChar,
                        startPriceAtChar: sizees.value[index].startPriceAtChar,
                    }
                    changeSize(sizeData, settings, index); 
                    haveDefault = true
                    break;
                }
                index++;
            }
            if(!haveDefault){
                var sizeData = {
                    label: sizees.value[0].label,
                    width: sizees.value[0].width,
                    height: sizees.value[0].height,
                    // thickness: (sizees.value[0].thickness.active ? sizees.value[0].thickness : {active: false, value: 0}),
                };
                var settings = {
                    textNumber: sizees.value[0].textNumber, 
                    charPrice: sizees.value[0].charPrice,
                    basePrice: sizees.value[0].basePrice,
                    maxTextChar: sizees.value[0].maxTextChar,
                    startPriceAtChar: sizees.value[0].startPriceAtChar,
                }
                changeSize(sizeData, settings, 0); 
            }
        }else{
            var size ={
                width: 0,
                height: 0
            }
            changeSize(size)
        }

        if(additionalComponents.value.length > 0){
            additionalComponents.value.forEach(addOption => {
                let index = 0
                var haveDefault = false

                while (index < addOption.options.length && !haveDefault) {
                    if(addOption.options[index].isDefault){
                        selectAddComponent(addOption.title, addOption.options[index].title, addOption.options[index].additionalPrice)
                        haveDefault = true
                        break;
                    }
                    index++;
                }
                if(!haveDefault){
                    selectAddComponent(addOption.title, addOption.options[0].title, addOption.options[0].additionalPrice)
                }
            })
        }
        selectAdditionnalsOption()

        if(!firstSetLoad.value){
            saveStep("select of first values")
        }
        handleReadyToSaveState(true, true)
        firstSetLoad.value = true
    }
    function selectAdvanceFirstValue(){
        handleReadyToSaveState(false);
        finalPrices.value = 0

        var stop = false
        var stopDefOption = false
        var stopOption = false

        currentMaterial.value.data.forEach(component => {
            if(!stop){
                showOptions('component', component)
                stop = true
            }
        })
        advancedComponent.value.options.forEach( (option, index) => {
            if(!stopDefOption){
                if(option.isDefault){
                    // console.log('default')
                    selectSignModel(option, index)
                    stopDefOption = true
                }
                if(!option.isDefault && stopDefOption && !stopOption){
                    // console.log('first')
                    selectSignModel(option, index)
                    stopDefOption = true
                    stopOption = true
                }
            }
        })
        selectAdditionnalsOption()
    }
    function selectAdditionnalsOption(){
        //selection des premières custom AdditionnalOptions 
        if(configAdditionnalOptions.value.length != 0){
            var customOptions = configAdditionnalOptions.value
            customOptions.forEach((option, indexx) => {
                switch(option.type){
                    case 'yes/no':
                        if(option.default === 'yes'){
                            addToOrUpdateArray(customAdditionalValues.value, indexx, option.label, option.inputs.yes, option.price)
                        }else{
                            addToOrUpdateArray(customAdditionalValues.value, indexx, option.label, option.inputs.no, {type: 'none', value: 0})
                        }
                    break;
                    case 'image-input':
                        addToOrUpdateArray(customAdditionalValues.value, indexx, option.label, option.options[0].value, option.options[0].price);
                        selectOption(option.options[0].value, option.options[0].price, indexx)
                    break;
                    case 'dropdown':
                        dropdownValue.value = option.options[0] 
                        addToOrUpdateArray(customAdditionalValues.value, indexx, option.label, option.options[0].value, option.options[0].price);
                        dropdownExampleImg.value = option.options[0].popImg
                        selectOption(option.options[0].value, option.options[0].price, indexx);
                        // dropdownExampleImg.value = option.options[0].popupImg;
                        dropdownIndex.value = indexx
                        // console.log(dropdownExampleImg.value, "Dropdown example", dropdownIndex.value);
                    break;
                }
            });

        }
    }


    function undo() {
        // console.log(stepArray.value.currentStateIndex , "Undo")
        if(stepArray.value.currentStateIndex > 0){
            var options = handleUndo()
            previousStep()
            addedTexts.value = options.texts
            usedImages.value = options.images
        //     centerSign(canvas)
        // centerSign(canvasBack)
        //         handleReadyToSaveState(false);
        // currentSizeValues.value = handleChangeSize(currentSizeData.value.width, currentSizeData.value.height, currentSizeData.value.name, currentSizeSetting.value.maxTextChar)
        // handleReadyToSaveState(true);

        }
        
    }
    function redo() {
        var options = handleRedo()
        nextStep()
        addedTexts.value = options.texts
        usedImages.value = options.images
        // centerSign(canvas)
        // centerSign(canvasBack)
        //         handleReadyToSaveState(false);
        // currentSizeValues.value = handleChangeSize(currentSizeData.value.width, currentSizeData.value.height, currentSizeData.value.name, currentSizeSetting.value.maxTextChar)
        // handleReadyToSaveState(true);
    }
    var resetAllBool = ref(false)
    function confirmResetAll(value){
        resetAllBool.value = value
    }
    function clearAll() {
        handleClearAll()
        clearStep()

        resetAllBool.value = false
    }

    var stepArray = ref({
        states: [],
        currentStateIndex: -1,
        undoStatus: false,
        redoStatus: false,
        undoFinishedStatus: 1,
        redoFinishedStatus: 1,
    })
    function saveStep(position){
        // console.log(position)
        var step = {
            material: {
                name: currentMaterial.value,
                type: materialType.value,
                values: selectedMaterial.value,
                textImage: currentMaterialTextImages.value,
            },
            size: {
                name: currentSizeName.value,
                data: currentSizeData.value,
                values: currentSizeValues.value,
                settings: currentSizeSetting.value,
            },
            shape: selectedShape.value,
            fixingMethod: {
                value: activeFixingMethode.value,
                excludeShapes: fixingExcludeShapes.value,
                excludeSizes: fixingExcludeSizes.value,
            },
            color: {
                textColor: {
                    face1: signTextColor1.value,
                    face2: signTextColor2.value
                },
                colorsObject: colorrs.value,

                face1: {
                    name: activeSignColor.value,
                    codeHex: activeSignColorCode1.value,
                    pattern: patternActive1.value
                },
                face2: {
                    name: activeSignFace2Color.value,
                    codeHex : activeSignColorCode2.value,
                    pattern: patternActive2.value
                },

                firstColorCheck: firstColorCheck.value,
            },
            border: {
                face1: {
                    type: activeFace1Border.value,
                    colorForBorder: colorForBorder1.value,
                    color: activeFace1BorderColor.value,

                    excludeShapes: border1ExcludeShapes.value,
                    excludeSizes: border1ExcludeSizes.value
                },
                face2: {
                    type: activeFace2Border.value,
                    colorForBorder: colorForBorder2.value,
                    color: activeFace2BorderColor.value,

                    excludeShapes: border2ExcludeShapes.value,
                    excludeSizes: border2ExcludeSizes.value
                },
            },
            texts: [...addedTexts.value],
            images: [...usedImages.value],
            price: finalPrices.value,
        }
        // console.log(usedImages.value, "usedImages")
        if(stepArray.value.currentStateIndex < stepArray.value.states.length-1){
            var indexToBeInserted = stepArray.value.currentStateIndex+1;
            stepArray.value.states[indexToBeInserted] = step;
            var numberOfElementsToRetain = indexToBeInserted+1;
            stepArray.value.states = stepArray.value.states.splice(0,numberOfElementsToRetain);
        }else{
            stepArray.value.states.push(step);
        }
        stepArray.value.currentStateIndex = stepArray.value.states.length-1;
        if((stepArray.value.currentStateIndex == stepArray.value.states.length-1) && stepArray.value.currentStateIndex != -1){
            // stepArray.value.redoButton.disabled= "disabled";
        }

        console.log(stepArray.value.states.length, "states INDEX")
        // console.log(stepArray.value.currentStateIndex, "state index")
    }
    function previousStep(){
        handleReadyToSaveState(false);

        if(stepArray.value.undoFinishedStatus){
            if(stepArray.value.currentStateIndex == -1){
                stepArray.value.undoStatus = false;
            }
            else{
                if (stepArray.value.states.length >= 1) {
                    stepArray.value.undoFinishedStatus = 0;
                    if(stepArray.value.currentStateIndex != 0){
                        stepArray.value.undoStatus = true;
    
                        var currentStep = stepArray.value.states[stepArray.value.currentStateIndex-1]
                        // console.log(stepArray.value.states[stepArray.value.currentStateIndex-1].images, "all states")
                        currentMaterial.value = currentStep.material.name
                        materialType.value = currentStep.material.type
                        selectedMaterial.value = currentStep.material.values
                        currentMaterialTextImages.value = currentStep.material.textImage

                        selectedShape.value = currentStep.shape
                        handleGetShape(selectedShape.value)

                        activeFixingMethode.value = currentStep.fixingMethod.value
                        fixingExcludeShapes.value = currentStep.fixingMethod.excludeShapes
                        fixingExcludeSizes.value = currentStep.fixingMethod.excludeSizes
                        handleSelectFixingMethode(activeFixingMethode.value)

                        currentSizeName.value = currentStep.size.name
                        currentSizeData.value = currentStep.size.data
                        currentSizeValues.value = currentStep.size.values
                        // handleChangeSize(currentSizeData.value.width, currentSizeData.value.height, currentSizeName.value, currentSizeValues.value.maxTextChar)
                        
                        signTextColor1.value = currentStep.color.textColor.face1
                        signTextColor2.value = currentStep.color.textColor.face2
                        colorrs.value = currentStep.color.colorsObject
                        activeSignColor.value = currentStep.color.face1.name
                        activeSignColorCode1.value = currentStep.color.face1.codeHex
                        patternActive1.value = currentStep.color.face1.pattern
                        activeSignFace2Color.value = currentStep.color.face2.name
                        activeSignColorCode2.value = currentStep.color.face2.codeHex
                        patternActive2.value = currentStep.color.face2.pattern

                        firstColorCheck.value = currentStep.color.firstColorCheck

                        if(materialType.value === 'advance'){
                            setImageToSignBackground(activeSignColorCode1.value, activeSignColor.value)
                        }else{
                            if(activeFace.value === 'front-face' && patternActive1.value){
                                setPattern(canvas, activeSignColorCode1.value)
                            }
                            if(activeFace.value === 'back-face' && patternActive2.value){
                                setPattern(canvasBack, activeSignColorCode2.value)
                            }
                        }
    
                        activeFace1Border.value = currentStep.border.face1.type
                        activeFace1BorderColor.value = currentStep.border.face1.color
                        border1ExcludeShapes.value = currentStep.border.face1.excludeShapes
                        border1ExcludeSizes.value = currentStep.border.face1.excludeSizes
    
                        activeFace2Border.value = currentStep.border.face2.type
                        activeFace2BorderColor.value = currentStep.border.face2.color
                        border2ExcludeShapes.value = currentStep.border.face2.excludeShapes
                        border2ExcludeSizes.value = currentStep.border.face2.excludeSizes
    
                        // if(materialType.value === 'simple'){
                        //     if(signTextColor1.value.active && signTextColor1.value.sameForBorder){

                        //     }else{
                        //         if(activeFace.value === 'front-face'){
                        //             handleSelectBorder(activeFace1Border.value)
                        //             if(activeFace1Border.value !== 'none'){
                        //                 handlechangeBorderColor(activeFace1BorderColor.value)
                        //             }
                        //         }else{
                        //             handleSelectBorder(activeFace2Border.value)
                        //             if(activeFace2Border.value !== 'none'){
                        //                 handlechangeBorderColor(activeFace2BorderColor.value)
                        //             }
                        //         }
                        //     }
                        // }
    
                        finalPrices.value = currentStep.price
    
                        stepArray.value.undoStatus = false;
                        stepArray.value.currentStateIndex -= 1;
                        // stepArray.value.undoButton.removeAttribute("disabled");
                        if(stepArray.value.currentStateIndex !== stepArray.value.states.length-1){
                            // stepArray.value.redoButton.removeAttribute('disabled');
                        }
                        stepArray.value.undoFinishedStatus = 1;
                    }
                    else if(stepArray.value.currentStateIndex == 0){
                        var currentStep = stepArray.value.states[0]

                        currentMaterial.value = currentStep.material.name
                        materialType.value = currentStep.material.type
                        selectedMaterial.value = currentStep.material.values
                        currentMaterialTextImages.value = currentStep.material.textImage

                        selectedShape.value = currentStep.shape
                        handleGetShape(selectedShape.value)

                        activeFixingMethode.value = currentStep.fixingMethod.value
                        fixingExcludeShapes.value = currentStep.fixingMethod.excludeShapes
                        fixingExcludeSizes.value = currentStep.fixingMethod.excludeSizes
                        handleSelectFixingMethode(activeFixingMethode.value)

                        currentSizeName.value = currentStep.size.name
                        currentSizeData.value = currentStep.size.data
                        currentSizeValues.value = currentStep.size.values
                        // handleChangeSize(currentSizeData.value.width, currentSizeData.value.height, currentSizeName.value, currentSizeValues.value.maxTextChar)
                        
                        signTextColor1.value = currentStep.color.textColor.face1
                        signTextColor2.value = currentStep.color.textColor.face2
                        colorrs.value = currentStep.color.colorsObject
                        activeSignColor.value = currentStep.color.face1.name
                        activeSignColorCode1.value = currentStep.color.face1.codeHex
                        patternActive1.value = currentStep.color.face1.pattern
                        activeSignFace2Color.value = currentStep.color.face2.name
                        activeSignColorCode2.value = currentStep.color.face2.codeHex
                        patternActive2.value = currentStep.color.face2.pattern

                        firstColorCheck.value = currentStep.color.firstColorCheck

                        if(materialType.value === 'advance'){
                            setImageToSignBackground(activeSignColorCode1.value, activeSignColor.value)
                        }else{
                            if(activeFace.value === 'front-face' && patternActive1.value){
                                setPattern(canvas, activeSignColorCode1.value)
                            }
                            if(activeFace.value === 'back-face' && patternActive2.value){
                                setPattern(canvasBack, activeSignColorCode2.value)
                            }
                        }
    
                        activeFace1Border.value = currentStep.border.face1.type
                        activeFace1BorderColor.value = currentStep.border.face1.color
                        border1ExcludeShapes.value = currentStep.border.face1.excludeShapes
                        border1ExcludeSizes.value = currentStep.border.face1.excludeSizes
    
                        activeFace2Border.value = currentStep.border.face2.type
                        activeFace2BorderColor.value = currentStep.border.face2.color
                        border2ExcludeShapes.value = currentStep.border.face2.excludeShapes
                        border2ExcludeSizes.value = currentStep.border.face2.excludeSizes
    
                        // console.log(currentStep.images, "added")
    
                        finalPrices.value = currentStep.price
    
                        stepArray.value.undoFinishedStatus = 1;
                        // stepArray.value.undoButton.disabled= "disabled";
                        // stepArray.value.redoButton.removeAttribute('disabled');
                        stepArray.value.currentStateIndex -= 1;
                    }
                }
            }
            handleReadyToSaveState(true);
        }
        
    }
    function nextStep(){
        handleReadyToSaveState(false);

        if(stepArray.value.redoFinishedStatus){
            if((stepArray.value.currentStateIndex == stepArray.value.states.length-1) && stepArray.value.currentStateIndex != -1){
                // stepArray.value.redoButton.disabled= "disabled";
            }else{
                if (stepArray.value.states.length > stepArray.value.currentStateIndex && stepArray.value.states.length != 0){
                    // console.log("stepArray.value")
                    stepArray.value.redoFinishedStatus = 0;
                    stepArray.value.redoStatus = true;

                    var currentStep = stepArray.value.states[stepArray.value.currentStateIndex+1]

                    currentMaterial.value = currentStep.material.name
                    materialType.value = currentStep.material.type
                    selectedMaterial.value = currentStep.material.values
                    currentMaterialTextImages.value = currentStep.material.textImage

                    selectedShape.value = currentStep.shape
                    handleGetShape(selectedShape.value)

                    activeFixingMethode.value = currentStep.fixingMethod.value
                    fixingExcludeShapes.value = currentStep.fixingMethod.excludeShapes
                    fixingExcludeSizes.value = currentStep.fixingMethod.excludeSizes
                    handleSelectFixingMethode(activeFixingMethode.value)

                    currentSizeName.value = currentStep.size.name
                    currentSizeData.value = currentStep.size.data
                    currentSizeValues.value = currentStep.size.values
                    // handleChangeSize(currentSizeData.value.width, currentSizeData.value.height, currentSizeName.value, currentSizeValues.value.maxTextChar)
                    
                    signTextColor1.value = currentStep.color.textColor.face1
                    signTextColor2.value = currentStep.color.textColor.face2
                    colorrs.value = currentStep.color.colorsObject
                    activeSignColor.value = currentStep.color.face1.name
                    activeSignColorCode1.value = currentStep.color.face1.codeHex
                    patternActive1.value = currentStep.color.face1.pattern
                    activeSignFace2Color.value = currentStep.color.face2.name
                    activeSignColorCode2.value = currentStep.color.face2.codeHex
                    patternActive2.value = currentStep.color.face2.pattern

                    firstColorCheck.value = currentStep.color.firstColorCheck

                    if(materialType.value === 'advance'){
                        setImageToSignBackground(activeSignColorCode1.value, activeSignColor.value)
                    }else{
                        if(activeFace.value === 'front-face' && patternActive1.value){
                            setPattern(canvas, activeSignColorCode1.value)
                        }
                        if(activeFace.value === 'back-face' && patternActive2.value){
                            setPattern(canvasBack, activeSignColorCode2.value)
                        }
                    }

                    activeFace1Border.value = currentStep.border.face1.type
                    activeFace1BorderColor.value = currentStep.border.face1.color
                    border1ExcludeShapes.value = currentStep.border.face1.excludeShapes
                    border1ExcludeSizes.value = currentStep.border.face1.excludeSizes

                    activeFace2Border.value = currentStep.border.face2.type
                    activeFace2BorderColor.value = currentStep.border.face2.color
                    border2ExcludeShapes.value = currentStep.border.face2.excludeShapes
                    border2ExcludeSizes.value = currentStep.border.face2.excludeSizes

                    // if(materialType.value === 'simple'){
                    //     if(activeFace.value === 'front-face'){
                    //         if(signTextColor1.value.active && signTextColor1.value.sameForBorder){
                    //             if(activeFace1Border.value !== 'none'){
                    //                 handleSelectBorder(activeFace1Border.value)
                    //                 handlechangeBorderColor(signTextColor1.value.codeHex)
                    //             }
                    //         }else{
                    //             handleSelectBorder(activeFace1Border.value)
                    //             if(activeFace1Border.value !== 'none'){
                    //                 handlechangeBorderColor(activeFace1BorderColor.value)
                    //             }
                    //         }

                    //     }else{
                    //         if(signTextColor2.value.active && signTextColor2.value.sameForBorder){
                    //             if(activeFace2Border.value !== 'none'){
                    //                 handleSelectBorder(activeFace2Border.value)
                    //                 handlechangeBorderColor(signTextColor2.value.codeHex)
                    //             }
                    //         }else{
                    //             handleSelectBorder(activeFace2Border.value)
                    //             if(activeFace2Border.value !== 'none'){
                    //                 handlechangeBorderColor(activeFace2BorderColor.value)
                    //             }
                    //         }
                    //     }
                    // }
                    

                    finalPrices.value = currentStep.price

                    stepArray.value.redoStatus = false;
                    stepArray.value.currentStateIndex += 1;
                    if(stepArray.value.currentStateIndex != -1){
                        // stepArray.value.undoButton.removeAttribute('disabled');
                    }
                    stepArray.value.redoFinishedStatus = 1;
                    if((stepArray.value.currentStateIndex == stepArray.value.states.length-1) && stepArray.value.currentStateIndex != -1){
                    //   stepArray.value.redoButton.disabled= "disabled";
                    }
                }
            }
            handleReadyToSaveState(true);
        }
    }
    function clearStep(){
        // currentSizeName.value = stepArray.value.states[0].size.name
        // currentSizeValues.value = stepArray.value.states[0].size.values


        addedTexts.value = []
        usedImages.value = []

        // finalPrices.value = stepArray.value.states[0].price

        stepArray.value.states = []
        stepArray.value.currentStateIndex = -1
        stepArray.value.undoFinishedStatus = 1;
        firstSetLoad.value = false
        selectMaterial(props.config.data.materials[0])
    }


    var flipped = ref(false)
    var activeFace = ref('front-face')
    function flipRect() {
        var flipper = document.getElementById('aso-canvas-containers')
        var signFace = document.getElementById('aso-sign-recto')
        var signBack = document.getElementById('aso-sign-verso')
        if(!flipped.value){
            flipper.classList.add('flipper-switch')
            handleCheckActiveSignFace('back')
            activeFace.value = 'back-face'
            activeCanvas = canvasBack
            canvas.discardActiveObject();
        }else{
            flipper.classList.remove('flipper-switch')
            handleCheckActiveSignFace('front')
            activeFace.value = 'front-face'
            activeCanvas = canvas
            canvasBack.discardActiveObject();
        }
        flipped.value = !flipped.value
    }


    function checkScreenSize(){
        var canvasContainer = document.getElementById("aso-canvas-containers")
        var canvasWidth = canvasContainer.clientWidth;
        var canvasHeight = canvasContainer.clientHeight;
        // console.log(canvasWidth, canvasHeight, "canvas", canvasContainer)

        let windowRatio = canvasWidth / canvasHeight;
        let targetRatio = 16/9;


        let scaleRatio;
        if (windowRatio > targetRatio) {
            scaleRatio = canvasHeight / (canvasWidth / targetRatio);
            var hValue = handleGetObjectByName('height-value')
            var wValue = handleGetObjectByName('width-value')
            var tValue = handleGetObjectByName('thickness-value')
            var fontSize = (hValue.fontSize / targetRatio) + 10
            // hValue.fontSize = fontSize
            // wValue.fontSize = fontSize
            // tValue.fontSize = fontSize
            // console.log("==1==", scaleRatio, "==1==")
        } else {
            scaleRatio = canvasWidth / (canvasHeight * targetRatio) - 0.15;
            var hValue = handleGetObjectByName('height-value')
            var wValue = handleGetObjectByName('width-value')
            var tValue = handleGetObjectByName('thickness-value')
            var fontSize = (hValue.fontSize * targetRatio) + 10
            // hValue.fontSize = fontSize
            // wValue.fontSize = fontSize
            // tValue.fontSize = fontSize
            // console.log("==2==", scaleRatio, "==2==")
        }
            // console.log("====", scaleRatio, "====")

        canvas.zoomToPoint({x: canvas.getWidth() /2, y: canvas.getHeight() /2}, scaleRatio)
        canvasBack.zoomToPoint({x: canvas.width/2, y: canvas.height/2}, scaleRatio)

        // ajustCanvasContent(canvas)
        // ajustCanvasContent(canvasBack)
        
        canvas.setWidth(canvasWidth);
        canvas.setHeight(canvasHeight);
        
        canvasBack.setWidth(canvasWidth);
        canvasBack.setHeight(canvasHeight);
        
        centerSign(canvas)
        centerSign(canvasBack)
        // function ajustCanvasContent(canva){
        //     var group = new fabric.Group(canva.getObjects())
            
        //     var canvasCenter = getCanvasCenter()
        //     // canva.centerObject(group);
        //     group.set('left', canvasCenter.x)
        //     group.set('top', canvasCenter.y)
            

        //     var items = group._objects;
        //     group._restoreObjectsState();
        //     canva.remove(group);
        //     canva.getObjects().forEach((obj) => {
        //         obj.setCoords()
        //         if(obj.name === 'safeObject'){
        //             // console.log(obj.left, obj.top, "safeObject is safe")
        //             if(firstLoad){
        //                 currentSizeValues.value.left = obj.left 
        //                 currentSizeValues.value.top = obj.top
        //             }
        //         }
        //     })
        //     canva.renderAll();
        // }


        handleReadyToSaveState(false);
        currentSizeValues.value = handleChangeSize(currentSizeData.value.width, currentSizeData.value.height, currentSizeData.value.name, currentSizeSetting.value.maxTextChar)
        handleReadyToSaveState(true);
    }
    function getCanvasCenter() {
        const canvasWidth = canvas.getWidth();
        const canvasHeight = canvas.getHeight();
        const viewportTransform = canvas.viewportTransform;

        // Coordonnées du centre du canvas avant la transformation de viewport
        const untransformedCenter = {
            x: canvasWidth / 2,
            y: canvasHeight / 2
        };

        // Appliquer la transformation de viewport inverse aux coordonnées du centre
        const invertedTransform = fabric.util.invertTransform(viewportTransform);
        const transformedCenter = fabric.util.transformPoint(untransformedCenter, invertedTransform);

        return transformedCenter;
    }
    function centerSign(canva){
        // console.log(canva, "center")
        var sign = handleGetObjectByName('safeObject')
        var canvasCenter = getCanvasCenter()

        const allObjects = canvas.getObjects();

        if (allObjects.length > 0) {
            const group = new fabric.Group(allObjects);
            canva.discardActiveObject();

            // Centrer le groupe
            group.set('left', canvasCenter.x - group.width/2)
            group.set('top', canvasCenter.y - group.height/2)

            group.setCoords();

            currentSizeValues.value.left = canvasCenter.x - group.width/2
            currentSizeValues.value.top = canvasCenter.y - group.height/2
            handleGetNewPosition(canvasCenter.x - group.width/2, canvasCenter.y - group.height/2)


            // Dégrouper les objets
            group._restoreObjectsState();
            canva.remove(group);
            canva.getObjects().forEach((obj) => {
                if(obj.name === 'aso-signText'){
                    if(obj.isEditing){
                        obj.exitEditing();
                    }
                    obj.clipPath = handleClipAddedObject(canva);

                }
                if (obj.name === 'aso-SignImage') {
                    obj.clipPath = handleClipAddedObject(canva);
                }
                obj.setCoords()
            })
        }
        // sign.set('left', canvasCenter.x - sign.width/2)
        // sign.set('top', canvasCenter.y - sign.height/2)

        // sign.setCoords();

        canva.renderAll()
    }
    

    var angleActive = ref(false)
    function showObjectValues(){
        var div = document.getElementById('activeObject-values');
        var object = activeCanvas.getActiveObject();
        if(object.type == 'image'){
            angleActive.value = true
            // showOptions('image')
            // editAddedImage(object)
        }
        div.classList.remove("aso-invisible");
        textsPrices.value = handleSetPrice()
        var priceObject = {
            name: 'none',
            price: 0
        }
        getOptionPrice(priceObject)

        // if(object.type === 'i-text'){
        //     showOptions('text')
        //     getTextObject(object)
        // }

    }
    function closeObjectValues(){
        var div = document.getElementById('activeObject-values');
        div.classList.add("aso-invisible");
        textsPrices.value = handleSetPrice()
        var priceObject = {
            name: 'none',
            price: 0
        }
        getOptionPrice(priceObject)
    }

    var allMaterials = ref([])
    var customSizeActive = ref(false)
    var currentMaterial = ref({})
    var currentMaterialTextImages = ref({})
    var selectedMaterial = ref('')
    var materialType = ref('')
    var firstLoad = ref(false)
    function selectMaterial(material){
        currentMaterial.value = material
        currentMaterialTextImages.value = material.data.textImages
        materialType.value = material.type
        // console.log("selectMaterial", material)
        selectedMaterial.value = material.name

        if(material.type == 'simple'){
            if(material.data.sizes.allSizes){
                sizees.value = material.data.sizes.allSizes
                thicknesss.value = material.data.sizes.thickness
            }else{
                sizees.value = []
            }
            if(material.data.sizes.customSize){
                customSizes.value = material.data.sizes.customSize
                customSizeActive.value = material.data.sizes.customSize.active
            }
            // if(material.data.sizes.customSize){
            // }
            if(customSizeActive.value){
                // console.log("custom size", customSizes.value)
                customSizeValues.value.width = customSizes.value.width.min
                customSizeValues.value.height = customSizes.value.height.min
            }


            shapees.value = material.data.shapes
            fixinggs.value = material.data.fixingMethods
            colorrs.value = material.data.colors
            borderrs.value = material.data.borders
            additionalComponents.value = material.data.additionalOptions
            addComponentSelected.value = []

            if(firstLoad.value){
                selectSimpleFirstValue()
            }
        }

        var stop = false
        var stopDefOption = false
        var stopOption = false
        if(material.type == 'advance'){
            // currentMaterial.value.data.forEach(component => {
            //     if(!stop){
            //         showOptions('component', component)
            //         stop = true
            //     }
            // })
            // advancedComponent.value.options.forEach( option => {
            //     if(!stopDefOption){
            //         if(option.isDefault){
            //             console.log('default')
            //             selectSignModel(option)
            //             stopDefOption = true
            //         }
            //         if(!option.isDefault && stopDefOption && !stopOption){
            //             console.log('first')
            //             selectSignModel(option)
            //             stopDefOption = true
            //             stopOption = true
            //         }
            //     }
            // })
            if(firstLoad.value){
                selectAdvanceFirstValue()
            }
        }

        firstLoad.value = true
    }

    var activeSignModelName = ref('')
    var activeSignModelId = ref(0)
    function selectSignModel(model, id){
        handleReadyToSaveState(false);

        firstSetLoad.value = false

        activeSignModelName.value = model.name
        activeSignModelId.value = id

        handleSelectBorder('none')
        var borderPrice1Object = {
            name: "border1",
            price: 0
        }
        getOptionPrice(borderPrice1Object)

        var borderPrice2Object = {
            name: "border2",
            price: 0
        }
        getOptionPrice(borderPrice2Object)

        // selection de fixing
        var stopFixing = false
        fixinggs.value = model.fixingMethods
        // console.log(model.fixingMethods,"fixing materail advance")
        fixinggs.value.forEach(fixingId => {
            allFixings.value.forEach((fixing, index) => {
                if(fixingId == index && !stopFixing){
                    // selectFixingMethode(fixing.type)
                    activeFixingMethode.value = fixing.type
                    stopFixing = true
                }
            });
        });

        // selection du shape 
        allShapes.value.forEach((shape, index) => {
            if(model.shapeId == index ){
                selectedShape.value = shape.value
                handleGetShape(shape.value,  activeFixingMethode.value)
            }
        })

        // selection de la size
        var modelSize = {
            name: model.name,
            width: model.size.width,
            height: model.size.height
        }
        var modelSizeSetting = {
            basePrice: model.size.basePrice,
            charPrice: model.size.charPrice,
            maxTextChar: model.size.maxTextChar,
            startPriceAtChar: model.size.startPriceAtChar,
        }
        changeSize(modelSize, modelSizeSetting)
        currentThickValue.value = -99
        handleChangeThickness(false, 0)

        //selection de la couleur
        setImageToSignBackground(model.image, model.color.name)
        if(configDoublePart.value.active){
            activeSignColor.value = model.color.name
            activeSignColorCode1.value = model.image
            
            activeSignFace2Color.value = model.color.name
             activeSignColorCode2.value = model.image
        }else{
            activeSignColor.value = model.color.name
            activeSignColorCode1.value = model.image
        }

        // selection de la couleur
        colorrs.value = [{color: model.color, image: model.image}]
        firstColorCheck.value = true

        var modelPrice = model.additionalPrice
        var modelPriceObject = {
            name: "model",
            price: modelPrice
        }
        getOptionPrice(modelPriceObject)

        // if(firstSetLoad.value){
        // }
        saveStep('select model')
        handleReadyToSaveState(true, true);
    }


    function setImageToSignBackground(image, colorName){
        activeSignColor.value = colorName
        activeSignColorCode1.value = image
        patternActive1.value = true

        activeSignFace2Color.value = colorName
        activeSignColorCode2.value = image
        patternActive2.value = true
        handleSetImageToSignBackground(image);
        // console.log("setImageToSign")
    }



    var customSizeValues = ref({
        label: '',
        width: 0,
        height: 0
    })
    var customSizeTextValues = ref({
        textNumber: 0, 
        charPrice: 0, 
        basePrice: 0, 
        maxTextChar: -1, 
        startPriceAtChar: 1
    })


    var sizeRatio = ref('big')
    var fixScale = ref(0)
    var signRatio = ref(0)
    var ratioScale = ref(0)



    function deleteObject(){
        // console.log(activeCanvas.getActiveObject())
        if(activeCanvas.getActiveObject() !== undefined){
            if(activeCanvas.getActiveObject() !== null){
                var object = activeCanvas.getActiveObject();
                // addedTexts.value = handleDeleteObject(object)
                if(object.type == 'i-text'){
                    addedTexts.value = handleDeleteObject(object)
                    selectText.value = false
                    console.log(addedTexts.value)
        
                    textsPrices.value = handleSetPrice()
                    var priceObject = {
                        name: 'none',
                        price: 0
                    }
                    getOptionPrice(priceObject)
                }
                if(object.type == 'image'){
                    usedImages.value = handleDeleteObject(object)
                    // selectText.value = false
                    // console.log(usedImages.value, 'image')
                    // console.log(optionsPrices.value, "before")
        
                    var index = 0
                    while(index < optionsPrices.value.length){
                        if(optionsPrices.value[index].type === 'image'){
                            const exists = usedImages.value.some(image => image.object.priceId === optionsPrices.value[index].id);
                            if(!exists){
                                optionsPrices.value.splice(index, 1)
                            }
                        }
                        index ++
                    }
                    var priceObject = {
                        name: 'none',
                        price: 0
                    }
                    getOptionPrice(priceObject)
                }

                if(firstSetLoad.value){
                    saveStep('clone object')
                }
            }
        }
    }
    function cloneObject(){
        if(activeCanvas.getActiveObject() !== undefined){
            if(activeCanvas.getActiveObject() !== null){
                newImagePriceId.value = newImagePriceId.value + 1
                var object = activeCanvas.getActiveObject();
                if(object.type === 'i-text'){
                    handleCloneObject(object)
                    saveStep('clonage du text');
                }
                textsPrices.value = handleSetPrice()
        
                var stop = false
                if(object.type === 'image'){
                    optionsPrices.value.forEach(element => {
                        if(element.type){
                            if(object.getSrc() === element.name && !stop){
                                // console.log(element, "qsdqsdqsdqsd")
                                var imagePriceObject = {
                                    id: newImagePriceId.value,
                                    name: element.name,
                                    type: 'image',
                                    price: element.price
                                }
                                getOptionPrice(imagePriceObject) 
                                stop = true
                            }
                        }
                    });
        
                    usedImages.value = handleCloneObject(object, newImagePriceId.value)
                }
                var priceObject = {
                    name: 'none',
                    price: 0
                }
                getOptionPrice(priceObject)

                // if(firstSetLoad.value){
                //     saveStep('clone object')
                // }
            }
        }
    }
    function centerHorizontally(){
        if(activeCanvas.getActiveObject() !== undefined){
            if(activeCanvas.getActiveObject() !== null){
                var object = activeCanvas.getActiveObject();
                handleCenterHorizontally(object)
            }
        }
    }
    function centerVertically(){
        if(activeCanvas.getActiveObject() !== undefined){
            if(activeCanvas.getActiveObject() !== null){
                var object = activeCanvas.getActiveObject();
                handleCenterVertically(object)
            }
        }
    }




    var sizees = ref([])
    var thicknesss = ref([])
    var customSizes = ref({})
    var allSizes = ref({})
    var currentSizeName = ref('')
    var currentSizeData = ref({})
    var currentSize = ref('')
    var currentSizeId = ref(0)
    var currentSizeValues = ref({})
    var currentSizeSetting = ref({})
    var currentSizeThickness = ref(false)
    function changeSize(sizeData, sizeSetting, sizeId) {
        currentSizeData.value = sizeData
        // console.log(sizeData, sizeSetting, "change size")
        if(sizeId != undefined){
            currentSizeId.value = sizeId
        }

        if(sizeSetting){
            currentSizeSetting.value = sizeSetting
            textNumberForSize.value = sizeSetting.textNumber
            currentSizeValues.value = handleChangeSize(sizeData.width, sizeData.height, sizeData.name, sizeSetting.maxTextChar)
        }else{
            currentSizeSetting.value = {}
            currentSizeValues.value = handleChangeSize(sizeData.width, sizeData.height, sizeData.name, null)
        }

        currentSizeName.value = sizeData.label;
        if(thicknesss.value.active){
            currentSizeThickness.value = thicknesss.value.active
            selectSizeThickness(thicknesss.value.values[0])
            handleChangeThickness(thicknesss.value.active, thicknesss.value.values[0])

        }else{
            handleChangeThickness(thicknesss.value.active, 0)
        }

        addedTexts.value = currentSizeValues.value.texts

        if(sizeSetting){
            var sizeBasePrice = sizeSetting.basePrice
            handleGetCharPrice(sizeSetting.charPrice, sizeSetting.startPriceAtChar)
            var sizeBasePriceObject = {
                name: "sizeTextBase",
                price: sizeBasePrice
            }
            getOptionPrice(sizeBasePriceObject)
        }

        if(sizeId != undefined){
            // desactivation du fixingMethode si il n'est pas actif pour la size selectionné
            if(fixingExcludeSizes.value.includes(sizeId)){
                // if(activeFixingId.value == matchingFixings.value.length-1){
                //     selectFixingMethode(matchingFixings.value[0].fixing.type, matchingFixings.value[0].fixingg, 0)
                // }
                // selectFixingMethode(matchingFixings.value[activeFixingId.value+1].fixing.type, matchingFixings.value[activeFixingId.value+1].fixingg, activeFixingId.value+1)
                selectFixingMethode('none')
                var fixingPriceObject = {
                    name: "fixing",
                    price: 0
                }
                getOptionPrice(fixingPriceObject)
            }

            // desactivation du border si il n'est pas actif pour la size selectionné
            if(activeFace.value == 'front-face'){
                if(border1ExcludeSizes.value.includes(sizeId)){
                    // if(face1BorderId.value === matchingBorders.value.length-1){
                    //     selectBorder(matchingBorders.value[0].border.value, matchingBorders.value[0].borderr.settings, matchingBorders.value[0].borderr.additionalPrice, matchingBorders.value[0].borderr.excludeShapes, matchingBorders.value[0].borderr.excludeSizes, 0)
                    // }
                    // selectBorder(matchingBorders.value[face1BorderId.value+1].border.value, matchingBorders.value[face1BorderId.value+1].borderr.settings, matchingBorders.value[face1BorderId.value+1].borderr.additionalPrice, matchingBorders.value[face1BorderId.value+1].borderr.excludeShapes, matchingBorders.value[face1BorderId.value+1].borderr.excludeSizes, face1BorderId.value+1)
                    selectBorder('none')
                    var borderPrice1Object = {
                        name: "border1",
                        price: 0
                    }
                    getOptionPrice(borderPrice1Object)
                }
            }
            if(activeFace.value == 'back-face'){
                if(border2ExcludeSizes.value.includes(sizeId)){
                    // if(face2BorderId.value === matchingBorders.value.length-1){
                    //     selectBorder(matchingBorders.value[0].border.value, matchingBorders.value[0].borderr.settings, matchingBorders.value[0].borderr.additionalPrice, matchingBorders.value[0].borderr.excludeShapes, matchingBorders.value[0].borderr.excludeSizes, 0)
                    // }
                    // selectBorder(matchingBorders.value[face2BorderId.value+1].border.value, matchingBorders.value[face2BorderId.value+1].borderr.settings, matchingBorders.value[face2BorderId.value+1].borderr.additionalPrice, matchingBorders.value[face2BorderId.value+1].borderr.excludeShapes, matchingBorders.value[face2BorderId.value+1].borderr.excludeSizes, face2BorderId.value+1)
                    selectBorder('none')
                    var borderPrice2Object = {
                        name: "border2",
                        price: 0
                    }
                    getOptionPrice(borderPrice2Object)
                }
            }
        }

        if(firstSetLoad.value){
            saveStep('select size')
        }

        // let timer;
        // clearTimeout(timer);
        // timer = setTimeout(() => {
        //     centerSign(canvas)
        //     centerSign(canvasBack)
        // }, 50);
    }
    var currentThickValue = ref(0)
    function selectSizeThickness(thick){
        currentThickValue.value = thick
        handleChangeThickness(thicknesss.value.active, thick)
    }

    var allShapes = ref({})
    var shapees = ref([])
    var selectedShape = ref('square')
    var currentShapeId = ref(0)
    function selectShape(shape, setting, shapeId){
        // currentShapeId.value = setting.shapeId
        currentShapeId.value = shapeId
        if(fixingExcludeShapes.value.includes(shapeId)){
            // if(activeFixingId === matchingFixings.value.length-1){
            //     selectFixingMethode(matchingFixings.value[0].fixing.type, matchingFixings.value[0].fixingg, 0)
            // }
            // selectFixingMethode(matchingFixings.value[activeFixingId+1].fixing.type, matchingFixings.value[activeFixingId+1].fixingg, activeFixingId+1)
            selectFixingMethode('none')
            var fixingPriceObject = {
                name: "fixing",
                price: 0
            }
            getOptionPrice(fixingPriceObject)
        }
        if(activeFace.value == 'front-face'){
            if(border1ExcludeShapes.value.includes(shapeId)){
                // if(face1BorderId.value === matchingBorders.value.length-1){
                //     selectBorder(matchingBorders.value[0].border.value, matchingBorders.value[0].borderr.settings, matchingBorders.value[0].borderr.additionalPrice, matchingBorders.value[0].borderr.excludeShapes, matchingBorders.value[0].borderr.excludeSizes, 0)
                // }
                // selectBorder(matchingBorders.value[face1BorderId.value+1].border.value, matchingBorders.value[face1BorderId.value+1].borderr.settings, matchingBorders.value[face1BorderId.value+1].borderr.additionalPrice, matchingBorders.value[face1BorderId.value+1].borderr.excludeShapes, matchingBorders.value[face1BorderId.value+1].borderr.excludeSizes, face1BorderId.value+1)
                selectBorder('none')
                var borderPrice1Object = {
                    name: "border1",
                    price: 0
                }
                getOptionPrice(borderPrice1Object)
            }
        }
        if(activeFace.value == 'back-face'){
            if(border2ExcludeShapes.value.includes(shapeId)){
                // if(face2BorderId.value === matchingBorders.value.length-1){
                //     selectBorder(matchingBorders.value[0].border.value, matchingBorders.value[0].borderr.settings, matchingBorders.value[0].borderr.additionalPrice, matchingBorders.value[0].borderr.excludeShapes, matchingBorders.value[0].borderr.excludeSizes, 0)
                // }
                // selectBorder(matchingBorders.value[face2BorderId.value+1].border.value, matchingBorders.value[face2BorderId.value+1].borderr.settings, matchingBorders.value[face2BorderId.value+1].borderr.additionalPrice, matchingBorders.value[face2BorderId.value+1].borderr.excludeShapes, matchingBorders.value[face2BorderId.value+1].borderr.excludeSizes, face2BorderId.value+1)
                selectBorder('none')
                var borderPrice2Object = {
                    name: "border2",
                    price: 0
                }
                getOptionPrice(borderPrice2Object)

            }
        }

        handleSelectShape(shape, currentSizeValues.value.width, currentSizeValues.value.height, currentSizeValues.value.top, currentSizeValues.value.left)
        selectedShape.value = shape

        var shapePrice = setting.additionalPrice
        var shapePriceObject = {
            name: "shape",
            price: shapePrice
        }
        getOptionPrice(shapePriceObject)

        if(firstSetLoad.value){
            saveStep('select shape')
        }
        
    }

    var firstBorderCheck = ref(true)
    var allBorders = ref({})
    var borderrs = ref([])
    var borderSettings = ref([])
    var face1BorderId = ref('')
    var face2BorderId = ref('')
    var activeFace1Border = ref('')
    var activeFace2Border = ref('')
    var activeFace1BorderColor = ref('')
    var activeFace2BorderColor = ref('')
    var activeFace1BorderColorPrice = ref(0)
    var activeFace2BorderColorPrice = ref(0)
    var borderColors1 = ref({})
    var borderColors2 = ref({})
    var customBorderColor1 = ref(false)
    var customBorderColor2 = ref(false)
    var border1ExcludeShapes = ref([])
    var border2ExcludeShapes = ref([])
    var border1ExcludeSizes = ref([])
    var border2ExcludeSizes = ref([])
    function selectBorder(border, settings, price, excludeShapes, excludeSizes, id, restart) {
        var border1Price = 0
        var border2Price = 0
        
        handleGetBorderRestart(restart)

        if(firstBorderCheck.value){
            var currentId = id
            var activeBorder = handleSelectBorder(border)
            var colors = (borderrs.value.settings.colors.length > 0 ? borderrs.value.settings.colors : {} )
            firstBorderColor.value = (borderrs.value.settings.colors.length > 0 ? borderrs.value.settings.colors[0] : {} )
            var customColor = borderrs.value.settings.enableBorderColor
            var exShapes = excludeShapes
            var exSizes = excludeSizes

            if(configDoublePart.value.active){
                face1BorderId.value = currentId
                activeFace1Border.value = activeBorder.type;
                // activeFace1BorderColor.value = activeBorder.color;
                borderColors1.value = colors
                customBorderColor1.value = customColor
                border1ExcludeShapes.value = exShapes
                border1ExcludeSizes.value = exSizes
                border1Price = price

                face2BorderId.value = currentId
                activeFace2Border.value = activeBorder.type;
                // activeFace2BorderColor.value = activeBorder.color;
                borderColors2.value = colors
                customBorderColor2.value = customColor
                border2ExcludeShapes.value = exShapes
                border2ExcludeSizes.value = exSizes
                border2Price = price

                var borderPrice1Object = {
                    name: "border1",
                    price: border1Price
                }
                getOptionPrice(borderPrice1Object)

                var borderPrice2Object = {
                    name: "border2",
                    price: border2Price
                }
                getOptionPrice(borderPrice2Object)

                var stop = false
                if(colorForBorder1.value || colorForBorder2.value){
                    if(colors.length > 0){
                        changeBorderColor(colors[0].codeHex, colors[0].additionalPrice, colors[0].name)
                    }
                }else{
                    // console.log("WARNING")
                    // changeBorderColor(colorTextColor.value, 0)
                }
                if(colorForBorder2.value){
                    if(colors.length > 0){
                        // changeBorderColor(colors[0].codeHex, colors[0].additionalPrice, colors[0].name)
                    }
                }else{
                    // changeBorderColor(colorTextColor.value, 0)
                }
            }else{
                face1BorderId.value = currentId
                activeFace1Border.value = activeBorder.type;
                // activeFace1BorderColor.value = activeBorder.color;
                borderColors1.value = colors
                customBorderColor1.value = customColor
                border1ExcludeShapes.value = exShapes
                border1ExcludeSizes.value = exSizes
                border1Price = price

                var borderPrice1Object = {
                    name: "border1",
                    price: border1Price
                }
                getOptionPrice(borderPrice1Object)

                if(colorForBorder1.value){
                    if(colors.length > 0){
                        changeBorderColor(colors[0].codeHex, colors[0].additionalPrice, colors[0].name)
                    }
                }else{
                    changeBorderColor(colorTextColor.value, 0)
                }
            }
        }else{
            var currentId = id
            var activeBorder = handleSelectBorder(border)
            var colors = (borderrs.value.settings.colors.length > 0 ? borderrs.value.settings.colors : {} )
            firstBorderColor.value = (borderrs.value.settings.colors.length > 0 ? borderrs.value.settings.colors[0] : {} )
            var customColor = borderrs.value.settings.enableBorderColor
            var exShapes = excludeShapes
            var exSizes = excludeSizes

            if(activeFace.value === "front-face"){
                face1BorderId.value = currentId
                activeFace1Border.value = activeBorder.type;
                // activeFace1BorderColor.value = activeBorder.color;
                borderColors1.value = colors
                customBorderColor1.value = customColor
                border1ExcludeShapes.value = exShapes
                border1ExcludeSizes.value = exSizes
                border1Price = price
                
                var borderPrice1Object = {
                    name: "border1",
                    price: border1Price
                }
                getOptionPrice(borderPrice1Object)

                if(colorForBorder1.value){
                    if(borderColors1.value.length > 0){
                        // changeBorderColor(borderColors1.value[0].codeHex, borderColors1.value[0].additionalPrice, borderColors1.value[0].name)
                        changeBorderColor(activeFace1BorderColor.value, activeFace1BorderColorPrice.value, borderColorName1.value)
                    }
                }else{
                    changeBorderColor(colorTextColor.value, 0)
                }
            }
            if(configDoublePart.value.active && activeFace.value === "back-face"){
                face2BorderId.value = currentId
                activeFace2Border.value = activeBorder.type;
                // activeFace2BorderColor.value = activeBorder.color;
                borderColors2.value = colors
                customBorderColor2.value = customColor
                border2ExcludeShapes.value = exShapes
                border2ExcludeSizes.value = exSizes
                border2Price = price

                var borderPrice2Object = {
                    name: "border2",
                    price: border2Price
                }
                getOptionPrice(borderPrice2Object)

                if(colorForBorder2.value){
                    if(borderColors2.value.length > 0){
                        // changeBorderColor(borderColors2.value[0].codeHex, borderColors2.value[0].additionalPrice, borderColors2.value[0].name)
                        changeBorderColor(activeFace2BorderColor.value, activeFace2BorderColorPrice.value, borderColorName2.value)
                    }
                }else{
                    changeBorderColor(colorTextColor.value, 0)
                }
            }
        }
        firstBorderCheck.value = false
    }

    var firstBorderColorCheck = ref(true)
    var firstBorderColor = ref({})
    var borderCustomColor1 = ref("#000000")
    var borderCustomColor2 = ref("#000000")
    var borderColorName1 = ref("")
    var borderColorName2 = ref("")
    var colorForBorder1 = ref(false)
    var colorForBorder2 = ref(false)
    function changeBorderColor(colorHex, price, name){
        // console.log(name, "changeBorderColor")
        if(firstBorderColorCheck.value){
            borderColorName1.value = name
            activeFace1BorderColor.value = colorHex
            activeFace1BorderColorPrice.value = price
            handlechangeBorderColor(colorHex, "first load fornt face")
            var borderColor1Price = price
            var borderColorPrice1Object = {
                name: "border-color1",
                price: borderColor1Price
            }
            getOptionPrice(borderColorPrice1Object)

            borderColorName2.value = name
            activeFace2BorderColor.value = colorHex
            activeFace2BorderColorPrice.value = price
            handlechangeBorderColor(colorHex, "first load back face")
            var borderColor2Price = price
            var borderColorPrice2Object = {
                name: "border-color2",
                price: borderColor2Price
            }
            getOptionPrice(borderColorPrice2Object)
        }else{
            if(activeFace.value === "front-face"){
                borderColorName1.value = name
                activeFace1BorderColor.value = colorHex
                activeFace1BorderColorPrice.value = price
                handlechangeBorderColor(colorHex,"front face border color")
                var borderColor1Price = price
    
                var borderColorPrice1Object = {
                    name: "border-color1",
                    price: borderColor1Price
                }
                getOptionPrice(borderColorPrice1Object)
            }
            if(configDoublePart.value.active && activeFace.value === "back-face"){
                borderColorName2.value = name
                activeFace2BorderColor.value = colorHex
                activeFace2BorderColorPrice.value = price
                handlechangeBorderColor(colorHex, "back face border color")
                var borderColor2Price = price
    
                var borderColorPrice2Object = {
                    name: "border-color2",
                    price: borderColor2Price
                }
                getOptionPrice(borderColorPrice2Object)
            }
        }

        if(firstSetLoad.value){
            saveStep('select borderColor')
        }
        firstBorderColorCheck.value = false
    }

    var firstColorCheck = ref(true)
    var allColors = ref({})
    var colorrs = ref([])
    var activeSignColor = ref('')
    var activeSignFace2Color = ref('')
    var activeSignColorCode1 = ref('')
    var activeSignColorCode2 = ref('')
    var patternActive1 = ref(false)
    var patternActive2 = ref(false)
    var signTextColor1 = ref(false)
    var signTextColor2 = ref(false)
    var colorTextColor = ref("")
    var colorTextColorName1 = ref("")
    var colorTextColorName2 = ref("")
    var colorTextCodeHex1 = ref("")
    var colorTextCodeHex2 = ref("")
    function changeSignColor(name, pattern, textColor, price, restart) {
        // console.log(color.name, "changeSignColor")
        var color1Price = 0
        var color2Price = 0
        
        if(firstColorCheck.value){
            if(configDoublePart.value.active){
                signTextColor1.value = textColor
                activeSignColor.value = name;
                color1Price = price
    
                signTextColor2.value = textColor
                activeSignFace2Color.value = name;
                color2Price = price
    
                var colorPrice1Object = {
                    name: "color1",
                    price: color1Price
                }
                getOptionPrice(colorPrice1Object)
    
                var colorPrice2Object = {
                    name: "color2",
                    price: color2Price
                }
                getOptionPrice(colorPrice2Object)

                if(pattern.active){
                    patternActive1.value = true
                    patternActive2.value = true
                    activeSignColorCode1.value = pattern.url
                    activeSignColorCode2.value = pattern.url
                }else{
                    patternActive1.value = false
                    patternActive2.value = false
                    activeSignColorCode1.value = pattern.codeHex
                    activeSignColorCode2.value = pattern.codeHex
                }
                if(textColor.active){
                    colorTextColorName1.value = textColor.name
                    colorTextColorName2.value = textColor.name
                    
                    colorTextCodeHex1.value = textColor.codeHex
                    colorTextCodeHex2.value = textColor.codeHex
                    if(textColor.sameForBorder){
                        colorForBorder1.value = false
                        colorForBorder2.value = false
                    }else{
                        colorForBorder1.value = true
                        colorForBorder2.value = true
                    }
                }else{
                    colorTextColorName1.value = ''
                    colorTextColorName2.value = ''

                    colorTextCodeHex1.value = ''
                    colorTextCodeHex1.value = ''

                    colorForBorder1.value = true
                    colorForBorder2.value = true
                }
            }else{
                signTextColor1.value = textColor
                activeSignColor.value = name;
                color1Price = price
                var colorPrice1Object = {
                    name: "color1",
                    price: color1Price
                }
                getOptionPrice(colorPrice1Object)

                if(pattern.active){
                    patternActive1.value = true
                    activeSignColorCode1.value = pattern.url
                }else{
                    patternActive1.value = false
                    activeSignColorCode1.value = pattern.codeHex
                }
                if(textColor.active){
                    colorTextColorName1.value = textColor.name
                    colorTextCodeHex1.value = textColor.codeHex
                    if(textColor.sameForBorder){
                        colorForBorder1.value = false
                    }else{
                        colorForBorder1.value = true
                    }
                }else{
                    colorTextColorName1.value = ''
                    colorTextCodeHex1.value = ''

                    colorForBorder1.value = true
                }
            }
        }else{
            if(activeFace.value === "front-face"){
                signTextColor1.value = textColor
                activeSignColor.value = name;
                color1Price = price
                
                var colorPrice1Object = {
                    name: "color1",
                    price: color1Price
                }
                getOptionPrice(colorPrice1Object)

                if(pattern.active){
                    patternActive1.value = true
                    activeSignColorCode1.value = pattern.url
                }else{
                    patternActive1.value = false
                    activeSignColorCode1.value = pattern.codeHex
                }
                if(textColor.active){
                    colorTextColorName1.value = textColor.name
                    colorTextCodeHex1.value = textColor.codeHex

                    if(textColor.sameForBorder){
                        colorForBorder1.value = false
                    }else{
                        colorForBorder1.value = true
                    }
                }else{
                    colorTextColorName1.value = ''
                    colorTextCodeHex1.value = ''

                    colorForBorder1.value = true
                }
            }

            if(configDoublePart.value.active && activeFace.value === "back-face"){
                signTextColor2.value = textColor
                activeSignFace2Color.value = name;
                color2Price = price

                var colorPrice2Object = {
                    name: "color2",
                    price: color2Price
                }

                if(pattern.active){
                    patternActive2.value = true
                    activeSignColorCode2.value = pattern.url
                }else{
                    patternActive2.value = false
                    activeSignColorCode2.value = pattern.codeHex
                }
                getOptionPrice(colorPrice2Object)
                if(textColor.active){
                    colorTextColorName2.value = textColor.name
                    colorTextCodeHex2.value = textColor.codeHex

                    if(textColor.sameForBorder){
                        colorForBorder2.value = false
                    }else{
                        colorForBorder2.value = true
                    }
                }else{
                    colorTextColorName2.value = ''
                    colorTextCodeHex2.value = ''

                    colorForBorder2.value = true
                }
            }
        }

        var defTextColor = (configTextSettings.value.colors.length > 0 ? configTextSettings.value.colors[0].codeHex : "#000000")
        // console.log("change", textColor)
        if(textColor.active){
            handleChangeSignColor(name, pattern, textColor, defTextColor, restart)
            if(textColor.sameForBorder){
                // changeBorderColor(textColor.codeHex, 0, textColor.name)
                handlechangeBorderColor(textColor.codeHex, "back face border color")
                if(firstBorderColorCheck.value){
                    if(configDoublePart.value.active){
                        borderColorName1.value = textColor.name 
                        borderColorName2.value = textColor.name

                        var borderColorPrice1Object = {
                            name: "border-color1",
                            price: 0
                        }
                        getOptionPrice(borderColorPrice1Object)
                        var borderColorPrice2Object = {
                            name: "border-color2",
                            price: 0
                        }
                        getOptionPrice(borderColorPrice2Object)
                    }else{
                        borderColorName1.value = textColor.name
                        var borderColorPrice1Object = {
                            name: "border-color1",
                            price: 0
                        }
                        getOptionPrice(borderColorPrice1Object)
                    }
                }else{
                    if(activeFace.value === "front-face"){
                        borderColorName1.value = textColor.name
                        var borderColorPrice1Object = {
                            name: "border-color1",
                            price: 0
                        }
                        getOptionPrice(borderColorPrice1Object)
                    }else{
                        borderColorName2.value = textColor.name
                        var borderColorPrice2Object = {
                            name: "border-color2",
                            price: 0
                        }
                        getOptionPrice(borderColorPrice2Object)
                    }
                }
                colorTextColor.value = textColor.codeHex
                // colorForBorder.value = false
                if(firstSetLoad.value){
                    saveStep('select borderColor')
                }
            }
            if(!textColor.sameForBorder){
                // console.log("qsqdqsdqdsqs")
                // colorForBorder.value = true
                if(activeFace.value === "front-face"){
                    changeBorderColor(activeFace1BorderColor.value, activeFace1BorderColorPrice.value)
                }else if(activeFace.value === "back-face"){
                    changeBorderColor(activeFace2BorderColor.value, activeFace2BorderColorPrice.value)
                }
            }
        }else{
            // colorForBorder.value = true
            handleChangeSignColor(name, pattern, textColor, defTextColor, restart)
            // changeBorderColor(firstBorderColor.value.codeHex, firstBorderColor.value.additionalPrice)
            if(activeFace.value === "front-face"){
                changeBorderColor(activeFace1BorderColor.value, activeFace1BorderColorPrice.value)
            }else if(activeFace.value === "back-face"){
                changeBorderColor(activeFace2BorderColor.value, activeFace2BorderColorPrice.value)
            }
        }

        firstColorCheck.value = false
        // if(firstSetLoad.value){
        //     saveStep('select signColor')
        // }
    }

    var allFixings = ref({})
    var fixinggs = ref([])
    var activeFixingId = ref(0)
    var activeFixingMethode = ref('')
    var fixingExcludeShapes = ref({})
    var fixingExcludeSizes = ref({})
    function selectFixingMethode(methode, setting, id){
        // console.log(methode, "select")
        activeFixingId.value = id
        activeFixingMethode.value = methode
        handleSelectFixingMethode(methode)

        if(setting){
            fixingExcludeShapes.value = setting.excludeShapes
            fixingExcludeSizes.value = setting.excludeSizes
            var fixingPrice = setting.additionalPrice
            var fixingPriceObject = {
                name: "fixing",
                price: fixingPrice
            }
            getOptionPrice(fixingPriceObject)
        }

        if(firstSetLoad.value){
            saveStep('slect fixingMethode')
        }

        // let timer;
        // clearTimeout(timer);
        // timer = setTimeout(() => {
        //     centerSign(canvas)
        //     centerSign(canvasBack)
        // }, 150);
    }

    var additionalComponents = ref({})
    var selectedAddComponent = ref("")
    var addComponentSelected = ref([])
    function selectAddComponent(addOption, option, price){

        function addUniqueObject(arr, obj, key) {
            const index = arr.findIndex(item => item[key] === obj[key]);
            if(index !== -1){
                arr[index] = obj;
            }
            else{
                arr.push(obj);
            }
        }
        addUniqueObject(addComponentSelected.value, {option: addOption, value: option}, 'option')

        selectedAddComponent.value = option

        // console.log(addComponentSelected.value, "selected")
        // console.log(addComponentValue.value, "selected fsdfsdf")

        var addOptionPrice = price
        var addOptionPriceObject = {
            type: 'add-component',
            name: addOption,
            price: addOptionPrice
        }
        getOptionPrice(addOptionPriceObject)
    }


    var customAdditionalValues = ref([])
    var noteValue = ref('')
    var dropdownIndex = ref()
    var dropdownValue = ref({})
    function addToOrUpdateArray(arr, id, label, value, price) {
        // if(img){
        //     dropdownIndex.value = id
        //     dropdownExampleImg.value = img
        // }
        // if(img == ''){
        //     dropdownExampleImg.value = ""
        // }
        // Vérifier si l'id existe déjà dans le tableau
        // console.log(dropdownValue.value, "id existe déjà dans le tableau")   
        const existingIndex = arr.findIndex(item => item.id === id);

        if (existingIndex !== -1) {
            // Si l'id existe, mettez à jour les valeurs de l'objet existant
            arr[existingIndex].label = label;
            arr[existingIndex].value = value;
            arr[existingIndex].price = price;
        } else {
            // Si l'index n'existe pas, ajoutez un nouvel objet au tableau
            arr.push({
                id: id,
                label: label,
                value: value,
                price: price,
            });
        }

        if(price){
            customAdditionalValues.value.forEach((element, id) => {
                if(element.price.type === 'base'){
                    var addOptionPrice = element.price.value
                    var addOptionPriceObject = {
                        type: 'add-options',
                        name: element.label,
                        priceType: 'base',
                        price: addOptionPrice,
                    }
                    getOptionPrice(addOptionPriceObject)
                }
                if(element.price.type === 'multiplier'){
                    var addOptionPrice = element.price.value
                    var addOptionPriceObject = {
                        type: 'add-options',
                        name: element.label,
                        priceType: 'multiplier',
                        price: addOptionPrice,
                    }
                    getOptionPrice(addOptionPriceObject)
                }
                if(element.price.type === 'none'){
                    var addOptionPriceObject = {
                        type: 'add-options',
                        name: element.label,
                        price: 0
                    }
                    getOptionPrice(addOptionPriceObject)
                }
            })
        }
    }

    var selectedOption = ref('')
    var selectedId = ref()
    function selectOption(label, price, id){
        selectedId.value = id
        switch(price.type) {
            case 'base':
                selectedOption.value = label + ' (' + '+' + price.value + props.currency + ')';
                break;
            case 'multiplier':
                selectedOption.value = label + ' (' + '+' + price.value + '%)';
                break;
            case 'none':
                selectedOption.value = label;
            break;

        }
    }




    var allClipart = ref({})
    var currentClipart = ref({})
    var clipartId = ref(0)
    var showClipart = ref(false)
    function showClipartImages(cliparts, id){
        showClipart.value = true
        currentClipart.value = cliparts
        clipartId.value = id
    }
    var clipartSection = ref(false)
    function showClipartsSection(statut){
        clipartSection.value = statut
    }
    var recentlyUsedImages = ref([])
    var usedImages = ref([])
    var imageError = ref("")
    var newImagePriceId = ref(0)
    async function addImageToSign(image, price, id){
        // console.log(price, "Added")
        newImagePriceId.value ++
        var currentImages = {}
        try {
            if(image){      
                var imagePrice = price
                var imagePriceObject = {
                    id: newImagePriceId.value,
                    name: image,
                    type: 'image',
                    price: imagePrice
                }
                getOptionPrice(imagePriceObject) 

                currentImages = await handleAddImageToSign(image, newImagePriceId.value, price)
            }else{
                currentImages = await handleAddImageToSign()
            }
            imageError.value = ""
            usedImages.value = currentImages.images
            addRecentImages()
        } catch (error) {
            currentImages = error
            imageError.value = error.error;
            usedImages.value = error.images;
            console.log(imageError.value, "lsdfsdf", usedImages.value);
        }

        if(currentImages != {}){
            // console.log('currentImages', currentImages.images{0})
            // editAddedImage(currentImages.images[0].object)
        }

        if(firstSetLoad.value){
            saveStep('add image to sign')
        }
        // console.log(usedImages.value, "currznt images")
    }

    var recentlyUsedImages = ref([])
    function addRecentImages(){
        function getImages(canva){
            var objects = canva.getObjects();
            for (var i = 0; i < objects.length; i++) {
                if (objects[i].name === "aso-SignImage") {
                    function addUniqueObject(arr, obj, key1, key2) {
                        const exists = arr.some(item => item[key1] === obj[key1]);
                        if (!exists) {
                            const exists2 = arr.some(item => item[key2] === obj[key2]);
                            if (!exists2) {
                                arr.push(obj);
                            }
                        }
                    }
                    addUniqueObject(recentlyUsedImages.value, {id: objects[i].id, object: objects[i], url: objects[i].getSrc()}, 'id', 'url')
                }
            }
        }

        let resizeTimer
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            getImages(canvas)
            getImages(canvasBack)
            if(recentlyUsedImages.value.length >= 6){
                recentlyUsedImages.value.shift()
            }
        }, 250); // Délai de 250 millisecondes
        
    }
    function deleteFromRecentlyUsed(index, tab){
        tab.splice(index, 1);
    }
    function editAddedImage(image){
        if(activeFace.value === image.canvasName){
            editImage.value = true
            activeCanvas.getObjects().forEach(function(obj){
                if(image.id === obj.id){
                    activeCanvas.setActiveObject(obj);
                    handleGetAddedImageValues(obj)
                    selectedImage.value.filters = obj.filters
                    checkFilter()
                }
            })
        }
    }
    function changeImageWidth(e){
        var newScaleX = e.target.value
        handleChangeImageWidth(newScaleX)
    }
    function changeImageHeight(e){
        var newScaleY = e.target.value
        handleChangeImageHeight(newScaleY)
    }
    function selectImageBorder(){

    }
    var setFilter = ref({
        blur : false,
        greyscale : false,
        sepia : false,
        embross : false,
        sharpen : false,
    })
    function selectImageFilter(filter){
        selectedImage.value.filters = handleSelectFilter(filter)
        checkFilter()
    }
    function checkFilter(){
        if(selectedImage.value.filters.some(item => item['name'] === 'blur')){
            setFilter.value.blur = true
        }else{
            setFilter.value.blur = false
        }

        if(selectedImage.value.filters.some(item => item['name'] === 'greyscale')){
            setFilter.value.greyscale = true
        }else{
            setFilter.value.greyscale = false
        }

        if(selectedImage.value.filters.some(item => item['name'] === 'sepia')){
            setFilter.value.sepia = true
        }else{
            setFilter.value.sepia = false
        }

        if(selectedImage.value.filters.some(item => item['name'] === 'embross')){
            setFilter.value.embross = true
        }else{
            setFilter.value.embross = false
        }

        if(selectedImage.value.filters.some(item => item['name'] === 'sharpen')){
            setFilter.value.sharpen = true
        }else{
            setFilter.value.sharpen = false
        }
    }




    var editAction = ref(false)
    var selectedText = ref({
        object: {},
        color: '',
        width: '',
        height: '',
        left: '',
        right: '',
        top: '',
        bottom: '',
        value: '',
        align: 'left',
        font: '',
        size: '',
        weight: 'normal',
        style: '',
        underline: false,
        linethrough: false,
        overline: false,
    })
    // function editText(eventData, transform){
    //     editAction.value = true
    //     var target = transform.target;
	// 	var canvas = target.canvas;
    // }

    var textNumberForSize = ref(0)
    var addedTexts = ref([])
    function addTextToSign(){
        addedTexts.value =  handleAddTextToSign()
        if(addedTexts.value.length > 0){
            var index = addedTexts.value.length - 1
            getTextObject(addedTexts.value[index], false)
        }
        textsPrices.value = handleSetPrice()
        var priceObject = {
            name: 'none',
            price: 0
        }
        getOptionPrice(priceObject)
        if(firstSetLoad.value){
            saveStep('add text to sign')
        }
    }
    function getTextObject(object, setActive) {
        if(activeFace.value == object.canvasName){
            selectText.value = true
            object.selected = true;
    
            selectedText.value.value = object.text
            
            activeCanvas.getObjects().forEach(function(obj){
                if(object.id === obj.id){
                    if(setActive){
                        activeCanvas.setActiveObject(obj);
                    }
                    handleGetAddedTextValues(obj)
                    selectedText.value.object = obj
                    selectedText.value.color = obj.fill
                    fontFamSelected.value = obj.fontFamily
                    selectedText.value.weight = obj.fontWeight
                    selectedText.value.align = obj.textAlign
                    selectedText.value.style = obj.fontStyle
                    selectedText.value.underline = obj.underline
                    selectedText.value.linethrough = obj.linethrough
                    selectedText.value.overline = obj.overline
                }
            })
            activeCanvas.requestRenderAll();
        }
    }
    function changeText(){
        selectText.value = false
    }

    function changeTextValue(event){
        handleChangeTextValue(event)

        textsPrices.value = handleSetPrice()
        var priceObject = {
            name: 'none',
            price: 0
        }
        getOptionPrice(priceObject)
    }
    function changeTextWeight(){
        var weight = handleChangeTextWeight()
        selectedText.value.weight = weight
    }
    function changeTextAlign(align){
        selectedText.value.align = handleChangeTextAlign(align)
    }
    function changeTextStyle(){
        selectedText.value.style = handleChangeTextStyle()
    }
    function changeTextSize(size, min, max){
        handleChangeTextSize(parseInt(size), min, max)
    }
    function changeTextSizeValue(statut){
        var max = configTextFontSettings.value.maximumFontSize
        var min = configTextFontSettings.value.minimumFontSize
        var input = document.getElementById('aso-text-size')

        if(statut === 'up'){
            if(input.value < max){
                input.stepUp()
                handleChangeTextSize(parseInt(input.value), min, max)
            }
        } else if(statut === 'down'){
            if(input.value > min){
                input.stepDown()
                handleChangeTextSize(parseInt(input.value), min, max)
            }
        }
    }
    var fontFamSelected = ref("Arial")
    var allFonts = ref([])
    function changeTextFontFam(font){
        fontFamSelected.value = font
        handleChangeTextFontFam(font)
    }
    var customTextColor = ref("#000000")
    function changeTextColor(color){
        selectedText.value.color = handleChangeTextColor(color)
    }
    function underlineText(){
        selectedText.value.underline = handleUnderlineText()
    }
    function crossText(){
        selectedText.value.linethrough = handleCrossText()
    }
    function overlineText(){
        selectedText.value.overline = handleOverlineText()
    }


    function changeTextBackground(textObject){

    }

    var selectedImage = ref({
        object: {},
        width: '',
        height: '',
        left: '',
        right: '',
        top: '',
        bottom: '',
        angle: 0,
        filters: [],
    })
    function turnLeftImage(){
        handleTurnImageLeft()
    }
    function turnRightImage(){
        handleTurnRightImage()
    }
    function flipImage(){
        handleFlipImage()
    }

    var optionsPrices = ref([])
    var textsPrices = ref(0)
    var finalPrices = ref(0)
    function getOptionPrice(priceObject){
        function addUniqueObject(arr, obj, key) {
            if(obj.type === 'image'){
                const index = arr.findIndex(item => item.id === obj.id)
                if(index !== -1){
                    arr[index] = obj;
                }
                else{
                    arr.push(obj);
                }
            }else{
                const index = arr.findIndex(item => item.name === obj.name);
                if(index !== -1){
                    arr[index] = obj;
                }
                else{
                    arr.push(obj);
                }
            }
        }
        addUniqueObject(optionsPrices.value, priceObject, 'name')
        // console.log(optionsPrices.value, "priceObject")

        function removeObjectByName(arr, name) {
            const index = arr.findIndex(item => item.name === name);
            if(index !== -1){
                arr.splice(index, 1);
            }
        }
        function removeObjectByType(arr, type){
            const index = arr.findIndex(item => item.type === type);
            if(index !== -1){
                arr.splice(index, 1);
            } 
        }
        function sumOptionsPrice(arr, key) {
            // var newPrice = 0
            // var multiple = 0
            // var index = 0
            // while (index < arr.length){
            //     if(arr[index].priceType === 'multiplier'){
            //         multiple = multiple + arr[index].price
            //         // newPrice = newPrice * multiple
            //     }else { 
            //         // newPrice = newPrice + arr[index].price
            //         if(multiple === 0){
            //             newPrice = (newPrice + arr[index].price) * 1
            //         }else{
            //             newPrice = (newPrice + arr[index].price) * multiple
            //         }
            //     }
                
            //     index++;
            // }
            // arr.forEach((object, id) => {
            // })
            // arr.reduce((sum, obj) => sum + obj[key], 0);

            let baseSum = 0;
            let multipliers = [];
            let present = false;

            for (const item of arr) {
                if (item.priceType === 'multiplier') {
                    multipliers.push(item.price);
                    present = true;
                }else{
                    baseSum += item.price;
                } 
            }

            let totalPrice = baseSum;
            if(present){
                totalPrice *= multipliers.reduce((sum, obj) => sum + obj, 0);
            }else{
                totalPrice *= multipliers.reduce((sum, obj) => sum + obj, 1);
            }
            
            return totalPrice
        }

        if(materialType.value === 'advance'){
            removeObjectByName(optionsPrices.value, 'none')
            removeObjectByName(optionsPrices.value, 'shape')
            removeObjectByName(optionsPrices.value, 'color1')
            removeObjectByName(optionsPrices.value, 'color2')
            removeObjectByName(optionsPrices.value, 'border1')
            removeObjectByName(optionsPrices.value, 'border2')

            removeObjectByType(optionsPrices.value, 'add-component')

            // console.log("options pricing advance", optionsPrices.value)
            // console.log("PRIX TOTAL",sumOptionsPrice(optionsPrices.value, 'price'))

        }else{
            removeObjectByName(optionsPrices.value, 'none')
            removeObjectByName(optionsPrices.value, 'model')
        }
        finalPrices.value = sumOptionsPrice(optionsPrices.value, 'price') + textsPrices.value;
        // console.log("PRIX TOTAL options",sumOptionsPrice(optionsPrices.value, 'price'))
        // console.log("PRIX TOTAL texts",textsPrices.value)
        // console.log("TOTAL PRICE", finalPrices.value)
    }

    var finish = ref(false)
    var configData = ref({})
    function finishConfig(){
        closeObjectValues()
        var heightValue = handleGetObjectByName('height-value', canvas)
        var widthValue = handleGetObjectByName('width-value', canvas)
        var thicknessValue = 'none'
        switch(currentSizeThickness.value) {
            case false:
                thicknessValue = 'none'
            break;
            case true:
                thicknessValue = String(currentThickValue.value + " " + configSettings.value.customizerSign.customizerOptions.measurementUnit)
            break;
        }

        function getBorderColor(border, canva){
            var color = ""
            if(border === 'none'){
                var sign = handleGetObjectByName('safeObject', canva)
                color = sign.stroke
            }
            if(border === 'normal'){
                var sign = handleGetObjectByName('safeObject', canva)
                color = sign.stroke
            }
            if(border === 'old-world'){
                var borderObject = handleGetObjectByName('old-world-border', canva)
                color = borderObject.fill
            }
            if(border === 'rounded-corners'){
                var borderObject = handleGetObjectByName('rounded-corners-border', canva)
                color = borderObject.fill
            }

            return color
        }

        console.log(getBorderColor(activeFace1Border.value, canvas))


        var textObjects = []
        var imageObjects = []
        
        var objects = canvas.getObjects();
        for (var i = 0; i < objects.length; i++) {
            if (objects[i].name === "aso-SignText") {
                function addUniqueObject(arr, obj, key) {
                    const exists = arr.some(item => item[key] === obj[key]);
                    if (!exists) {
                        arr.push(obj);
                    }
                }
                addUniqueObject(textObjects, objects[i], 'id')
            }
            if (objects[i].name === "aso-SignImage") {
                function addUniqueObject(arr, obj, key) {
                    const exists = arr.some(item => item[key] === obj[key]);
                    if (!exists) {
                        arr.push(obj);
                    }
                }
                addUniqueObject(imageObjects, objects[i], 'id')
            }
        }
        var addedObject = handleFinishConfiguration(textObjects, imageObjects)


        var designImagesFace1 = []
        function generateOutputImage(tab, canva) {
            switch (configOutputSettings.value.filesFormat) {
                case 'png':
                    tab.push({format: 'png', url: genImage(canva, 'png')})
                break;

                case 'jpeg':
                    tab.push({format: 'jpeg', url: genImage(canva, 'jpeg')})
                break;

                case 'svg':
                    tab.push({format: 'svg', url: genImage(canva, 'svg')})
                break;

                case 'png+jpeg':
                    tab.push({format: 'png', url: genImage(canva, 'png')})
                    tab.push({format: 'jpeg', url: genImage(canva, 'jpeg')})
                break;

                case 'png+svg':
                    tab.push({format: 'png', url: genImage(canva, 'png')})
                    tab.push({format: 'svg', url: genImage(canva, 'svg')})
                break;

                case 'jpeg+svg':
                    tab.push({format: 'jpeg', url: genImage(canva, 'jpeg')})
                    tab.push({format: 'svg', url: genImage(canva, 'svg')})
                break;
            }
            
            return tab
        }

        configData.value = {
            sign: {
                size: {
                    label: (configVisualiserTexts.value.textSize && configVisualiserTexts.value.textSize.trim() != '' ? configVisualiserTexts.value.textSize : 'Size'),
                    value: {
                        width: {
                            label: (configVisualiserTexts.value.textWidth && configVisualiserTexts.value.textWidth.trim() != '' ? configVisualiserTexts.value.textWidth : 'Width'),
                            value: widthValue.text
                        },
                        height: {
                            label: (configVisualiserTexts.value.textHeight && configVisualiserTexts.value.textHeight.trim() != '' ? configVisualiserTexts.value.textHeight : 'Height'),
                            value: heightValue.text
                        },
                        thickness: {
                            label: (configVisualiserTexts.value.thickness && configVisualiserTexts.value.thickness.trim() != '' ? configVisualiserTexts.value.thickness : 'thickness'),
                            value: (currentThickValue.value !== -99 ? thicknessValue : 'none'),
                        }
                    }
                },
                shape: { 
                    label: (configVisualiserTexts.value.textShape && configVisualiserTexts.value.textShape.trim() != '' ? configVisualiserTexts.value.textShape : 'Shape'),
                    value: selectedShape.value,
                },
                color: {
                    label: (configVisualiserTexts.value.textColor && configVisualiserTexts.value.textColor.trim() != '' ? configVisualiserTexts.value.textColor : 'Colors'),
                    value: {
                        name: activeSignColor.value,
                        codeHex: activeSignColorCode1.value,
                        textColor: {
                            active: signTextColor1.value.active,
                            name: (signTextColor1.value.active ? colorTextColorName1.value : null),
                            codeHex: (signTextColor1.value.active ? colorTextCodeHex1.value : null),
                        }
                    },
                },
                border: {
                    label: (configVisualiserTexts.value.textBorder && configVisualiserTexts.value.textBorder.trim() != '' ? configVisualiserTexts.value.textBorder : 'Borders'),
                    value: {
                        type: activeFace1Border.value,
                        color: (activeFace1Border.value == 'none' ? null : (signTextColor1.value.active && !colorForBorder1.value ? colorTextColorName1.value : borderColorName1.value)),
                        codeHex: (activeFace1Border.value == 'none' ? null : getBorderColor(activeFace1Border.value, canvas)),
                    },
                },
                fixingMethod: {
                    label: (configVisualiserTexts.value.textFixingMethods && configVisualiserTexts.value.textFixingMethods.trim() != '' ? configVisualiserTexts.value.textFixingMethods : 'Fixing method'),
                    value: activeFixingMethode.value
                },
            },
            texts: {
                label: (configVisualiserTexts.value.textOptionText && configVisualiserTexts.value.textOptionText.trim() != '' ? configVisualiserTexts.value.textOptionText : 'Texts'),
                value: addedObject.texts,
            },
            images: {
                label: (configVisualiserTexts.value.textImage && configVisualiserTexts.value.textImage.trim() != '' ? configVisualiserTexts.value.textImage : 'Images'),
                value: addedObject.images,
            },
            additionalComponents: (addComponentSelected.value.length > 0 ? addComponentSelected.value : []),
            additionalOptions: (customAdditionalValues.value.length > 0 ? customAdditionalValues.value : []),
            designImages: generateOutputImage(designImagesFace1, canvas),
            output:{
                prefix: (configOutputSettings.value.zipOutputFiles.active ? configOutputSettings.value.zipOutputFiles.zipOutFolderPrefix : ''),
                designDisplayComposition: configOutputSettings.value.designComposition
            }

        }

        if(configDoublePart.value.active){
            var face2TextObjects = []
            var face2ImageObjects = []
            var objects = canvasBack.getObjects();

            for (var i = 0; i < objects.length; i++) {
                if (objects[i].name === "aso-SignText") {
                    function addUniqueObject(arr, obj, key) {
                        const exists = arr.some(item => item[key] === obj[key]);
                        if (!exists) {
                            arr.push(obj);
                        }
                    }
                    addUniqueObject(face2TextObjects, objects[i], 'id')
                }
                if (objects[i].name === "aso-SignImage") {
                    function addUniqueObject(arr, obj, key) {
                        const exists = arr.some(item => item[key] === obj[key]);
                        if (!exists) {
                            arr.push(obj);
                        }
                    }
                    addUniqueObject(face2ImageObjects, objects[i], 'id')
                }
            }
            var face2AddedObject = handleFinishConfiguration(face2TextObjects, face2ImageObjects)

            var designImagesFace2 = []

            configData.value = {
                faces: {
                    face1: configDoublePart.value.part1,
                    face2: configDoublePart.value.part2,
                },
                sign: {
                    size: {
                        label: (configVisualiserTexts.value.textSize && configVisualiserTexts.value.textSize.trim() != '' ? configVisualiserTexts.value.textSize : 'Size'),
                        value: {
                            width: {
                                label: (configVisualiserTexts.value.textWidth && configVisualiserTexts.value.textWidth.trim() != '' ? configVisualiserTexts.value.textWidth : 'Width'),
                                value: widthValue.text
                            },
                            height: {
                                label: (configVisualiserTexts.value.textHeight && configVisualiserTexts.value.textHeight.trim() != '' ? configVisualiserTexts.value.textHeight : 'Height'),
                                value: heightValue.text
                            },
                            thickness: {
                                label: (configVisualiserTexts.value.thickness && configVisualiserTexts.value.thickness.trim() != '' ? configVisualiserTexts.value.thickness : 'thickness'),
                                value: (currentThickValue.value !== -99 ? thicknessValue : 'none'),
                            }
                        }
                    },
                    shape: { 
                        label: (configVisualiserTexts.textShape && configVisualiserTexts.textShape.trim() != '' ? configVisualiserTexts.textShape : 'Shape'),
                        value: selectedShape.value,
                    },
                    color: {
                        label: (configVisualiserTexts.textColor && configVisualiserTexts.textColor.trim() != '' ? configVisualiserTexts.textColor : 'Colors'),
                        value: {
                            face1: {
                                name: activeSignColor.value,
                                codeHex: activeSignColorCode1.value,
                                textColor: {
                                    active: signTextColor1.value.active,
                                    name: (signTextColor1.value.active ? colorTextColorName1.value : null),
                                    codeHex: (signTextColor1.value.active ? colorTextCodeHex1.value : null),
                                }
                            },
                            face2: {
                                name: activeSignFace2Color.value,
                                codeHex : activeSignColorCode2.value,
                                textColor: {
                                    active: signTextColor2.value.active,
                                    name: (signTextColor2.value.active ? colorTextColorName2.value : null),
                                    codeHex: (signTextColor2.value.active ? colorTextCodeHex2.value : null),
                                }
                            },
                        },
                    },
                    border: {
                        label: (configVisualiserTexts.value.textBorder && configVisualiserTexts.value.textBorder.trim() != '' ? configVisualiserTexts.value.textBorder : 'Borders'),
                        value: {
                            face1: {
                                type: activeFace1Border.value,
                                color: (activeFace1Border.value == 'none' ? null : (signTextColor1.value.active && !colorForBorder1.value ? colorTextColorName1.value : borderColorName1.value)),
                                codeHex: (activeFace1Border.value == 'none' ? null : getBorderColor(activeFace1Border.value, canvas)),
                            },
                            face2: {
                                type: activeFace2Border.value,
                                color: (activeFace2Border.value == 'none' ? null : (signTextColor2.value.active && !colorForBorder2.value ? colorTextColorName2.value : borderColorName2.value)),
                                codeHex: (activeFace2Border.value == 'none' ? null : getBorderColor(activeFace2Border.value, canvasBack)),
                            },
                        },
                    },
                    fixingMethod: {
                        label: (configVisualiserTexts.value.textFixingMethods && configVisualiserTexts.value.textFixingMethods.trim() != '' ? configVisualiserTexts.value.textFixingMethods : 'Fixing method'),
                        value: activeFixingMethode.value
                    },
                },
                texts: {
                    label: (configVisualiserTexts.value.textOptionText && configVisualiserTexts.value.textOptionText.trim() != '' ? configVisualiserTexts.value.textOptionText : 'Texts'),
                    value: {
                        face1 :addedObject.texts,
                        face2 :face2AddedObject.texts
                    }
                },
                images: {
                    label: (configVisualiserTexts.value.textImage && configVisualiserTexts.value.textImage.trim() != '' ? configVisualiserTexts.value.textImage : 'Images'),
                    value: {
                        face1 :addedObject.images,
                        face2 :face2AddedObject.images
                    }
                },
                additionalComponents: (addComponentSelected.value.length > 0 ? addComponentSelected.value : []),
                additionnalOptions: (customAdditionalValues.value.length > 0 ? customAdditionalValues.value : []),
                designImages: {
                    face1: designImagesFace1,
                    face2: generateOutputImage(designImagesFace2, canvasBack),
                },
                output:{
                    prefix: (configOutputSettings.value.zipOutputFiles.active ? configOutputSettings.value.zipOutputFiles.zipOutFolderPrefix : ''),
                    designDisplayComposition: configOutputSettings.value.designComposition
                }
            }

        }
        console.log(configData.value, "Added")
        finish.value = true
    }

    var showImg = ref(false)
    var prevImg = ref("")
    function closeprevImg(){
        showImg.value = false
    }
    function showConfigRender(){
            // designImages: generateImage(canvas, configOutputSettings.value.filesFormat),
        if(configDoublePart.value.active){
            if(activeFace.value === "front-face"){
                prevImg.value = genImage(canvas, 'png');
            }else if(activeFace.value === "back-face"){
                prevImg.value = genImage(canvasBack, 'png');
            }
        }else{
            prevImg.value = genImage(canvas, 'png');
        }
        showImg.value = true
    }

    function genImage(canva, format, width, height) {
        // Sauvegarde les dimensions actuelles du canvas
        const originalWidth = canva.getWidth();
        const originalHeight = canva.getHeight();

        // Redimensionne le canvas si les nouvelles dimensions sont spécifiées
        if (width && height) {
            canva.setWidth(width);
            canva.setHeight(height);
            checkScreenSize()
        }


        // fabric.Image.fromURL(configOutputSettings.value.waterMark, function(img) {
        //     // Créer le pattern à partir de l'image
        //     const pattern = new fabric.Pattern({
        //         source: img.getElement(),
        //         repeat: 'repeat'
        //     });

        //     // Définir le pattern comme arrière-plan du canvas
        //     canva.setBackgroundColor({source: pattern.source, repeat: 'repeat'}, canva.renderAll.bind(canva));

        //     // Ajouter des objets au canva après avoir défini le pattern
        //     canva.renderAll();
        // });


        canva.getObjects().forEach(object => {
            if(object.name === 'heightLine' || object.name === 'widthLine' || object.name === 'height-value' || object.name === 'width-value' || object.name === 'thickness-value'){
                object.set('visible', false);
            }
        });

        var dataURL  = ""
        // Génère l'image avec le format spécifié
        switch (format) {
            case 'png':
                dataURL = canva.toDataURL({
                    format: 'png',
                    quality: 1.0 // 1.0 est la meilleure qualité pour les formats jpeg et webp
                });
            break;

            case 'jpeg':
                canva.backgroundColor = configColors.value.canvasBackgroundColor
                dataURL = canva.toDataURL({
                    format: 'jpeg',
                    quality: 1.0 // 1.0 est la meilleure qualité pour les formats jpeg et webp
                });
            break;

            case 'webp':
                dataURL = canva.toDataURL({
                    format: 'webp',
                    quality: 1.0 // 1.0 est la meilleure qualité pour les formats jpeg et webp
                });
            break;

            case 'svg':
                const svgData = canva.toSVG();
                const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
                dataURL = URL.createObjectURL(blob);
            break;
        
            default:

            break;
        }

        // Restaure les dimensions et l'affichage originales du canvas
        canvas.setBackgroundColor('transparent', canvas.renderAll.bind(canvas));
        canva.getObjects().forEach(object => {
            if(object.name === 'heightLine' || object.name === 'widthLine' || object.name === 'height-value' || object.name === 'width-value' || object.name === 'thickness-value'){
                object.set('visible', true);
            }
        });

        canva.setWidth(originalWidth);
        canva.setHeight(originalHeight);

        // checkScreenSize()
        canva.renderAll();

        return dataURL;
    }



// fonctions concernant l'affichage des exemples
    //popup d'exemple matéral
    var showMaterialEx = ref(false)
    var materialExample = ref('')
    function showMaterialExample(statut, example){
        showMaterialEx.value = statut
        if(example){
            materialExample.value = example
        }
    }

    //popup d'exemple fixing-methode
    var showFixingEx = ref(false)
    var fixingExample = ref('')
    function showFixingExample(statut, example){
        showFixingEx.value = statut
        if(example){
            fixingExample.value = example
        }
    }    

    //popup d'exemple matéral
    var showAddComponentEx = ref(false)
    var addComponentExample = ref('')
    var addComponentExId = ref(0)
    function showAddComponentExample(statut, example, id){
        showAddComponentEx.value = statut
        if(id){
            addComponentExId.value = id
        }
        if(example){
            addComponentExample.value = example
        }
    }    

    // popup d'example additionnal options "yes/no"
    var yesNoIndex = ref()
    var showYesNo = ref(false)
    var showYesNoImg =ref("")
    function showYesNoExample(img, id){
        yesNoIndex.value = id
        showYesNo.value = !showYesNo.value
        showYesNoImg.value = img
    }

    // popup d'example additionnal options "image-input"
    var inputImageIndex = ref();
    var inputImageLabel = ref('');
    var inputImageExample = ref(false);
    var inputImageImg = ref('');
    function showInputImageExample(img, id, label){
        inputImageIndex.value = id;
        inputImageLabel.value = label;
        inputImageExample.value = !inputImageExample.value
        inputImageImg.value = img
    }

    //popup d'example additionnal option "dropdown"
    var dropdownExampleImg = ref('');
    var dropdownExample = ref(false);
    function showDropdownExample(){
        dropdownExample.value = !dropdownExample.value
    }

    const isAddingToCart = ref(false)
    const addToCart = async ()=>{
        console.log("addd to  cart  start now ");
        isAddingToCart.value = true;
        const cart_data = {
            recaps:{...configData.value,
                material:{
                    label:configVisualiserTexts.value.textMaterial,
                    value: currentMaterial.value.name
                },
                custom_price:finalPrices.value
            },
            quantity:1
        }
        var add = await add_to_cart(cart_data,props.config.data.settings.generals.product.redirectToCheckOutPage);
        if(!add.success){
            toastMessage(add.message,"error");
            isAddingToCart.value = false
        }
    }

</script>

<style scoped>
    /* #canvaas {
        border: 3px solid green
    } */

    .flipper {
        position: relative;
        /* width: 100%;
        height: 100%; */
        text-align: center;
        transition: transform 0.8s;
        transform-style: preserve-3d;
    }

    .flipper-switch {
        transform: rotateY(180deg);
    }



    #aso-sign-recto, #aso-sign-verso {
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
    }

    #aso-sign-recto {
        /* background-color: #bbb; */
        color: black;
    }

    #aso-sign-verso {
        /* background-color: dodgerblue; */
        color: white;
        transform: rotateY(180deg);
    }
</style>
