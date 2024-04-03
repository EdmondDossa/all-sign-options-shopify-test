<template>
    <div id="aso-frontend-app" class="aso-relative aso-flex aso-w-full aso-h-[100vh]">

        <div class="aso-w-full lg:aso-w-[92%] aso-h-full aso-flex aso-flex-col">
            <div class="aso-w-full aso-h-[7%] lg:aso-h-[10%] aso-bg-[#016464] lg:aso-bg-white aso-flex aso-items-center aso-justify-between">
                <div v-if="isLoaded" class="aso-w-full aso-h-full aso-flex aso-items-center aso-justify-between aso-px-2">
                    <div class="aso-w-1/5 aso-bg-gradient-to-r aso-from-zinc-400 aso-via-zinc-200 aso-to-zinc-400 aso-p-4 aso-h-[65%] aso-animate-pulse"></div>
                    <div class="aso-w-1/3 aso-h-[65%] aso-flex aso-space-x-4">
                        <div class="aso-w-1/3 aso-bg-gradient-to-r aso-from-zinc-400 aso-via-zinc-200 aso-to-zinc-400 aso-p-4 aso-h-full aso-animate-pulse"></div>
                        <div class="aso-w-1/3 aso-bg-gradient-to-r aso-from-zinc-400 aso-via-zinc-200 aso-to-zinc-400 aso-p-4 aso-h-full aso-animate-pulse"></div>
                        <div class="aso-w-1/3 aso-bg-gradient-to-r aso-from-zinc-400 aso-via-zinc-200 aso-to-zinc-400 aso-p-4 aso-h-full aso-animate-pulse"></div>
                    </div>
                    <div class="aso-w-1/5 aso-bg-gradient-to-r aso-from-zinc-400 aso-via-zinc-200 aso-to-zinc-400 aso-p-4 aso-h-[65%] aso-animate-pulse"></div>
                </div>
                
                <div v-show="!isLoaded" class="aso-flex aso-w-1/3 aso-justify-center aso-text-white lg:aso-text-black aso-text-base lg:aso-text-2xl aso-font-bold aso-text-center">
                    {{props.config.name}}
                </div>

                <div v-show="!isLoaded" class="aso-flex aso-w-1/3 aso-justify-center aso-items-center aso-space-x-4">
                    <span @click="clearAll" class="aso-bg-[#22272D] aso-w-fit aso-h-fit aso-flex aso-full-center aso-space-x-2 aso-p-2 aso-px-3 aso-rounded-full focus:aso-bg-[#016464] hover:aso-bg-[#016464]">
                        <svg class="aso-h-5 aso-w-5" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="simple-line-icons:reload">
                            <path id="Vector" d="M14.9789 0C7.48448 0 1.38745 6.09744 1.38745 13.5918C1.38745 20.6362 6.81604 26.5274 13.7967 27.1298L11.1056 28.4938C10.7732 28.6762 10.5754 29.0863 10.7723 29.4102L10.8675 29.6563C11.0653 29.9802 11.4937 30.0951 11.8251 29.9136L16.3166 27.6139C16.3223 27.6102 16.3284 27.6112 16.334 27.6074L16.6354 27.4424C16.8018 27.351 16.912 27.2015 16.956 27.0351C17.002 26.8687 16.9809 26.6835 16.882 26.5223L16.7034 26.2293C16.7006 26.2237 16.695 26.2199 16.6917 26.2148L13.9176 21.8798C13.7207 21.5559 13.2932 21.441 12.96 21.6224L12.742 21.7743C12.4096 21.9557 12.3876 22.4245 12.5845 22.7475L14.2214 25.2867C14.2125 25.2862 14.2045 25.2829 14.196 25.2825C8.06477 24.8803 3.26242 19.7442 3.26242 13.5919C3.26245 7.13109 8.51852 1.875 14.9789 1.875C21.4401 1.875 26.7257 7.13109 26.7257 13.5919C26.7257 17.3119 25.0171 20.7286 22.0382 22.966C21.6244 23.2772 21.5409 23.8651 21.8517 24.279C22.163 24.6938 22.7508 24.7763 23.1647 24.4655C26.6199 21.8701 28.6012 17.9068 28.6012 13.5919C28.6007 6.09753 22.4737 0 14.9789 0Z" fill="white"/>
                            </g>
                        </svg>
                        
                        <div class="aso-hidden lg:aso-flex aso-text-white aso-text-center">
                            {{props.config.data.settings.languageImages.visualizer.textButtonRefresh}} 
                        </div>
                    </span>
                        
                    <div class="aso-flex aso-justify-center aso-items-center aso-space-x-4">
                        <div class="aso-flex aso-justify-center aso-items-center aso-space-x-2">
                            <span @click="undo" class="aso-w-fit aso-h-fit aso-flex aso-full-center aso-shadow-[1px_1px_7px_1px_rgba(0,0,0,0.1)] aso-p-2 aso-rounded-full aso-bg-white aso-text-black hover:aso-bg-[#016464] hover:aso-text-white aso-base-animation">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-4 aso-h-4 lg:aso-w-5 lg:aso-h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                                </svg>
                            </span>
                            <div class="aso-hidden lg:aso-flex aso-text-sm">
                                {{props.config.data.settings.languageImages.visualizer.textButtonBack}} 
                            </div>
                        </div>

                        <div class="aso-flex aso-justify-between aso-items-center aso-space-x-2">
                            <span @click="redo" class="aso-w-fit aso-h-fit aso-flex aso-full-center aso-shadow-[1px_1px_7px_1px_rgba(0,0,0,0.1)] aso-p-2 aso-rounded-full aso-bg-white aso-text-black hover:aso-bg-[#016464] hover:aso-text-white aso-base-animation">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-4 aso-h-4 lg:aso-w-5 lg:aso-h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3" />
                                </svg>
                            </span>
                            <div class="aso-hidden lg:aso-flex aso-text-sm">
                                {{props.config.data.settings.languageImages.visualizer.textButtonNext}} 
                            </div>
                        </div>
                    </div>
                </div>
    
                <div v-show="!isLoaded" id="aso-price" class="aso-flex aso-w-1/3 aso-justify-center aso-items-center">
                    <div class="aso-text-center aso-text-lg aso-font-semibold">
                        {{props.config.data.settings.languageImages.visualizer.textBeforePrice}}
                    </div>
                    <div class="aso-flex aso-text-[#FFBC3C] lg:aso-text-black aso-text-lg lg:aso-text-3xl aso-font-bold aso-text-center">
                        $ 495,09
                    </div>
                    <div class="aso-text-center aso-text-lg aso-font-semibold">
                        {{props.config.data.settings.languageImages.visualizer.textAfterPrice}}
                    </div>
                </div>
            </div>
    
            <div class="aso-relative aso-w-full aso-h-[93%] lg:aso-h-[90%] aso-flex aso-flex-col aso-items-center aso-bg-[#f5f5f5]">
                <div v-show="configDoublePart.active" class="aso-w-full aso-h-[6%] aso-flex aso-items-center aso-bg-white aso-space-x-3 aso-px-4 aso-border-y">
                    <span class="aso-text-sm aso-font-medium">{{configDoublePart.label}}</span>

                    <span @click="flipRect" :class="`aso-mx-2 aso-rounded-full aso-p-1 aso-px-2 aso-text-white aso-font-medium aso-h-[80%] aso-w-[6%] aso-bg-zinc-200 aso-relative aso-flex aso-justify-between aso-items-center aso-border`">
                        <span :class="`${activeFace == 'front-face' ? 'aso-left-[3%]' : 'aso-translate-x-[100%] aso-right-[53%]'} aso-bg-[#016464] aso-translate-x aso-absolute aso-w-[50%] aso-h-[90%] aso-transition-all ease-in duration-200 z-0 aso-rounded-full aso-top-[5%]`"></span>
                        
                        <span :class="`${activeFace == 'front-face' ? 'aso-text-white' : ''} aso-flex aso-full-center aso-pl-1`">
                            {{configDoublePart.part1}}
                        </span>
                        <span :class="`${activeFace == 'back-face' ? '' : 'aso-text-white'} aso-flex aso-full-center aso-pr-1`">
                            {{configDoublePart.part2}}
                        </span>
                    </span>
                </div>

                <div id="aso-canvas-containers" class="flipper aso-relative aso-w-full aso-h-[54%] lg:aso-h-[82%] aso-border-4 aso-border-black">
                    <div v-if="isLoaded" class="aso-absolute aso-top-[50%] aso-left-[50%] aso-translate-x-[-50%] aso-translate-y-[-50%] aso-w-[50%] aso-h-[50%] aso-bg-gradient-to-r aso-from-zinc-400 aso-via-zinc-200 aso-to-zinc-400 aso-p-4 aso-animate-pulse"></div>

                    <div id="aso-sign-recto" class="aso-relative aso-w-full aso-h-full">
                        <canvas  ref="canvasFace1Ref" id="canaas" class="aso-relative aso-w-full aso-h-full"></canvas>
                    </div>

                    <div id="aso-sign-verso" class="aso-absolute aso-left-0 aso-top-0">
                        <canvas ref="canvasFace2Ref" class="canvas2 aso-w-full aso-h-full"></canvas>
                    </div>

                </div>
                <div v-show="!isLoaded">
                    <div id="activeObject-values" class="aso-w-fit aso-invisible aso-absolute aso-top-[2%] aso-left-[50%] aso-translate-x-[-50%] aso-bg-[#828282] aso-text-white aso-text-lg aso-p-2 aso-px-3 aso-rounded-md aso-shadow-md aso-z-10">
                        <div class="aso-space-y-1 aso-text-sm">
                            <div>
                                <span class="aso-font-semibold">Size of object:</span> width: <span id="text-width"></span> - height: <span id="text-height"></span>
                            </div>
                            <div>
                                <span class="aso-font-semibold">Position of object:</span> left: <span id="text-left"></span>, right: <span id="text-right"></span>, top: <span id="text-top"></span>, bottom: <span id="text-bottom"></span>
                            </div>
                            <div v-show="angleActive">
                                <span class="aso-font-semibold">Angle of object:</span> <span id="text-angle"></span>
                            </div>
                        </div>
                    </div>

                    <div id="aso-editButtons" class="aso-absolute aso-invisible aso-w-fit aso-h-fit aso-flex aso-space-x-3 aso-bg-white aso-p-2 aso-border-2 aso-rounded-md aso-shadow-md aso-translate-x-[-50%]">
                        <div @click="cloneObject()" class="aso-flex aso-flex-col aso-full-center aso-space-y-1 hover:aso-text-[#016464] aso-cursor-pointer">
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
                            <p class="aso-text-[10px] aso-font-semibold">Clone</p>
                        </div>

                        <div @click="deleteObject()" class="aso-flex aso-flex-col aso-full-center aso-space-y-1 hover:aso-text-[#016464] aso-cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="aso-w-5 aso-h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                            <p class="aso-text-[10px] aso-font-semibold">Delete</p>
                        </div>

                        <div @click="centerVertically()" class="aso-flex aso-flex-col aso-full-center aso-space-y-1 hover:aso-text-[#016464] aso-cursor-pointer">
                            <svg focusable="false" viewBox="0 0 24 24" class="aso-w-5 aso-h-5">
                                <path d="M11 3a1 1 0 1 1 2 0v2.586l1.293-1.293a1 1 0 0 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 1.414-1.414L11 5.586V3zM9.707 19.707a1 1 0 0 1-1.414-1.414l3-3a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1-1.414 1.414L13 18.414V21a1 1 0 1 1-2 0v-2.586l-1.293 1.293zM4 11a1 1 0 1 0 0 2h16a1 1 0 1 0 0-2H4z" fill="currentColor"></path>
                            </svg>
                            <p class="aso-text-[10px] aso-font-semibold">CenterV</p>
                        </div>

                        <div @click="centerHorizontally()" class="aso-flex aso-flex-col aso-full-center aso-space-y-1 hover:aso-text-[#016464] aso-cursor-pointer">
                            <svg focusable="false" viewBox="0 0 24 24" class="aso-w-5 aso-h-5">
                                <path d="M22 11a1 1 0 1 1 0 2h-3.586l1.293 1.293a1 1 0 0 1-1.414 1.414l-3-3a1 1 0 0 1 0-1.414l3-3a1 1 0 0 1 1.414 1.414L18.414 11H22zM4.293 9.707a1 1 0 0 1 1.414-1.414l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.414-1.414L5.586 13H2a1 1 0 1 1 0-2h3.586L4.293 9.707zM13 4a1 1 0 1 0-2 0v16a1 1 0 1 0 2 0V4z" fill="currentColor"></path>
                            </svg>
                            <p class="aso-text-[10px] aso-font-semibold">CenterH</p>
                        </div>
                    </div>
                </div>

                <div id="aso-optionsButtons-container" class="aso-w-full aso-relative lg:aso-w-[55%] aso-h-[8%] lg:aso-h-[15%] aso-flex aso-full-center aso-bg-[#016565] lg:aso-bg-transparent">
                    <div v-if="isLoaded" class="aso-w-full aso-h-[80%] aso-flex aso-full-center aso-space-x-4">
                        <div class="ncpc-w-[20%] aso-bg-gradient-to-r aso-from-zinc-400 aso-via-zinc-200 aso-to-zinc-400 aso-p-4 aso-h-full"></div>
                        <div class="ncpc-w-[20%] aso-bg-gradient-to-r aso-from-zinc-400 aso-via-zinc-200 aso-to-zinc-400 aso-p-4 aso-h-full"></div>
                        <div class="ncpc-w-[20%] aso-bg-gradient-to-r aso-from-zinc-400 aso-via-zinc-200 aso-to-zinc-400 aso-p-4 aso-h-full"></div>
                        <div class="ncpc-w-[20%] aso-bg-gradient-to-r aso-from-zinc-400 aso-via-zinc-200 aso-to-zinc-400 aso-p-4 aso-h-full"></div>
                        <div class="ncpc-w-[20%] aso-bg-gradient-to-r aso-from-zinc-400 aso-via-zinc-200 aso-to-zinc-400 aso-p-4 aso-h-full"></div>
                        <div class="ncpc-w-[20%] aso-bg-gradient-to-r aso-from-zinc-400 aso-via-zinc-200 aso-to-zinc-400 aso-p-4 aso-h-full"></div>
                        <div class="ncpc-w-[20%] aso-bg-gradient-to-r aso-from-zinc-400 aso-via-zinc-200 aso-to-zinc-400 aso-p-4 aso-h-full"></div>
                        <div class="ncpc-w-[20%] aso-bg-gradient-to-r aso-from-zinc-400 aso-via-zinc-200 aso-to-zinc-400 aso-p-4 aso-h-full"></div>
                        <div class="ncpc-w-[20%] aso-bg-gradient-to-r aso-from-zinc-400 aso-via-zinc-200 aso-to-zinc-400 aso-p-4 aso-h-full"></div>
                    </div>
                    
                    <!-- <div v-show="!isLoaded" class="aso-absolute aso-left-0 lg:aso-translate-x-[-80%] aso-shadow-[1px_1px_7px_1px_rgba(0,0,0,0.1)] lg:aso-shadow-none lg:aso-h-fit lg:aso-w-fit lg:aso-mr-2 aso-flex aso-full-center">
                        <div class="aso-flex lg:aso-h-fit lg:aso-w-fit aso-p-2 aso-bg-[#016464] lg:aso-bg-[#80acac] hover:aso-bg-[#016464] aso-text-black hover:aso-text-white aso-rounded-lg aso-base-animation">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="aso-w-7 aso-h-7">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                        </div>
                    </div>   -->

                    <div v-show="!isLoaded" class="aso-w-full aso-h-full aso-flex aso-full-center aso-overflow-auto no-scrollbar aso-mx-8 lg:aso-mx-0 lg:px-4">
                        <div @click="showOptions('material')" class="aso-w-fit aso-h-[90%] aso-flex aso-flex-col aso-full-center aso-space-y-1 aso-bg-transparent lg:aso-bg-white hover:aso-bg-[#016565] hover:aso-text-white aso-px-4 aso-rounded-lg lg:aso-shadow-[-7px_1px_15px_0px_#828282] aso-base-animation">
                            <svg class="aso-w-6 aso-h-6" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="mdi:material">
                                <path id="Vector" d="M4.21671 33.5687L6.45004 34.5254V19.0992L2.40004 29.11C1.71671 30.8525 2.50004 32.8512 4.21671 33.5687ZM36.7167 27.2479L28.45 6.83332C28.2059 6.21413 27.79 5.68187 27.2538 5.30235C26.7177 4.92282 26.0848 4.71268 25.4334 4.69791C25 4.69791 24.55 4.76624 24.1167 4.95416L11.8334 10.1646C11.2405 10.4225 10.7323 10.8492 10.3689 11.3943C10.0056 11.9393 9.80234 12.5797 9.78337 13.2396C9.76671 13.6667 9.85004 14.1621 10 14.6062L18.3334 35.0208C18.8167 36.3533 20.05 37.1391 21.35 37.1562C21.7834 37.1562 22.2167 37.0708 22.6334 36.9L34.9 31.6896C35.7154 31.3473 36.3648 30.6872 36.7055 29.8542C37.0462 29.0213 37.0502 28.0839 36.7167 27.2479ZM13.1334 14.9479C12.6913 14.9479 12.2674 14.7679 11.9549 14.4475C11.6423 14.1272 11.4667 13.6926 11.4667 13.2396C11.4667 12.7865 11.6423 12.352 11.9549 12.0316C12.2674 11.7112 12.6913 11.5312 13.1334 11.5312C14.05 11.5312 14.8 12.3 14.8 13.2396C14.8 14.1792 14.05 14.9479 13.1334 14.9479ZM9.80004 33.7396C9.80004 34.6457 10.1512 35.5148 10.7763 36.1555C11.4015 36.7963 12.2493 37.1562 13.1334 37.1562H15.55L9.80004 22.9087V33.7396Z" fill="currentColor"/>
                                </g>
                            </svg>
                            <div class="aso-text-[10px] lg:aso-text-[13px] aso-font-medium">
                                {{props.config.data.settings.languageImages.visualizer.textMaterial}} 
                            </div>
                        </div>
                        
                        <div v-if="materialType == 'advance'" v-for="(component, id) in currentMaterial.data" class="aso-w-fit aso-h-full" >
                            <div @click="showOptions('component', component)" class="aso-w-fit aso-h-[90%] aso-flex aso-flex-col aso-full-center aso-space-y-1 aso-bg-transparent lg:aso-bg-white hover:aso-bg-[#016565] hover:aso-text-white aso-px-4 aso-rounded-lg lg:aso-shadow-[-7px_1px_15px_0px_#828282] aso-base-animation">
                                <svg class="aso-w-6 aso-h-6" viewBox="0 0 50 50" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <g id="fluent-mdl2:product-release">
                                    <path id="Vector" d="M21.875 37.5244V22.8516L6.25 15.0391V36.5234L19.5312 43.1885L18.7744 46.2891L3.125 38.4766V11.5234L23.4375 1.3916L43.75 11.5234V18.1152C42.6107 18.2943 41.569 18.6605 40.625 19.2139V15.0391L25 22.8516V34.3994L21.875 37.5244ZM18.4082 7.37305L32.666 15.5273L38.6963 12.5L23.4375 4.8584L18.4082 7.37305ZM23.4375 20.1416L29.2969 17.2119L15.0391 9.05762L8.17871 12.5L23.4375 20.1416ZM45.1172 21.875C45.8008 21.875 46.4355 21.9971 47.0215 22.2412C47.6074 22.4854 48.1283 22.819 48.584 23.2422C49.0397 23.6654 49.3815 24.1781 49.6094 24.7803C49.8372 25.3825 49.9674 26.0254 50 26.709C50 27.3438 49.8779 27.9622 49.6338 28.5645C49.3896 29.1667 49.0397 29.6956 48.584 30.1514L31.0791 47.6562L21.875 49.9512L24.1699 40.7471L41.6748 23.2666C42.1468 22.7946 42.6758 22.4447 43.2617 22.2168C43.8477 21.9889 44.4661 21.875 45.1172 21.875ZM46.3623 27.9541C46.7041 27.6123 46.875 27.1973 46.875 26.709C46.875 26.2044 46.7122 25.7975 46.3867 25.4883C46.0612 25.179 45.638 25.0163 45.1172 25C44.8893 25 44.6696 25.0326 44.458 25.0977C44.2464 25.1628 44.0592 25.2848 43.8965 25.4639L27.002 42.3584L26.1719 45.6543L29.4678 44.8242L46.3623 27.9541Z" fill="currentColor"/>
                                    </g>
                                </svg>
                                <div class="aso-text-[10px] lg:aso-text-[13px] aso-font-medium">
                                    {{component.name}}
                                </div>
                            </div>
                        </div>
    
                        <div v-if="sizees.length > 0 || customSizeActive && materialType == 'simple'" @click="showOptions('size')" class="aso-w-fit aso-h-[90%] aso-flex aso-flex-col aso-full-center aso-space-y-1 aso-bg-transparent lg:aso-bg-white hover:aso-bg-[#016565] hover:aso-text-white aso-px-4 aso-rounded-lg lg:aso-shadow-[-7px_1px_15px_0px_#828282] aso-base-animation">
                            <svg class="aso-w-6 aso-h-6" viewBox="0 0 47 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="fluent:keyboard-layout-resize-24-filled">
                                <path id="Vector" d="M41.5083 17.9375C41.8623 17.9375 42.2043 18.0496 42.4711 18.2531C42.7379 18.4566 42.9115 18.7378 42.9596 19.0445L42.9733 19.2187V33.7396C42.9734 34.7135 42.5508 35.6512 41.7908 36.3632C41.0308 37.0751 39.9901 37.5081 38.8791 37.5748L38.5783 37.5833H34.6716C34.3004 37.5832 33.9431 37.4599 33.6719 37.2383C33.4007 37.0167 33.2358 36.7133 33.2105 36.3894C33.1852 36.0655 33.3014 35.7453 33.5356 35.4935C33.7699 35.2417 34.1047 35.077 34.4724 35.0328L34.6716 35.0208H38.5783C38.9323 35.0208 39.2743 34.9087 39.5411 34.7052C39.8079 34.5017 39.9815 34.2206 40.0296 33.9138L40.0433 33.7396V19.2187C40.0433 18.8789 40.1976 18.553 40.4724 18.3128C40.7471 18.0725 41.1197 17.9375 41.5083 17.9375ZM41.5083 3.41666L41.645 3.42178L41.8423 3.45082L41.9751 3.48328L42.0923 3.52257L42.2291 3.58236L42.3892 3.67461L42.5455 3.7942L42.6451 3.88986L42.733 3.99578L42.8307 4.14953L42.8639 4.21274L42.9108 4.32549C42.9323 4.3887 42.9498 4.45532 42.9596 4.52366L42.9733 4.69791V13.2396C42.9732 13.5642 42.8322 13.8767 42.5788 14.1139C42.3254 14.3511 41.9785 14.4953 41.6081 14.5175C41.2378 14.5396 40.8717 14.4379 40.5838 14.2331C40.2958 14.0282 40.1075 13.7354 40.057 13.4138L40.0433 13.2396V7.78999L31.3119 15.4262C31.0501 15.6534 30.7001 15.7858 30.3316 15.7972C29.9631 15.8085 29.6032 15.6979 29.3239 15.4875C29.0445 15.277 28.8662 14.9821 28.8244 14.6617C28.7827 14.3413 28.8807 14.0189 29.0988 13.7589L29.2413 13.6154L37.9688 5.97916H31.7416C31.3876 5.97914 31.0456 5.86702 30.7788 5.66351C30.512 5.46001 30.3384 5.17889 30.2903 4.87216L30.2766 4.69791C30.2766 4.38829 30.4048 4.08916 30.6375 3.85582C30.8702 3.62248 31.1916 3.47072 31.5424 3.42861L31.7416 3.41666H41.5083ZM25.8816 17.9375C26.9953 17.9374 28.0674 18.307 28.8815 18.9717C29.6955 19.6363 30.1906 20.5465 30.2668 21.5182L30.2766 21.7812V33.7396C30.2768 34.7135 29.8541 35.6512 29.0941 36.3632C28.3341 37.0751 27.2935 37.5081 26.1824 37.5748L25.8816 37.5833H8.30162C7.18797 37.5834 6.11579 37.2138 5.30178 36.5492C4.48776 35.8845 3.99261 34.9743 3.91638 34.0027L3.90662 33.7396V21.7812C3.90648 20.8073 4.32911 19.8696 5.0891 19.1577C5.8491 18.4457 6.88977 18.0127 8.0008 17.946L8.30162 17.9375H25.8816ZM20.9983 29.8958H13.1849C12.3841 29.8958 11.7199 30.5279 11.7199 31.1771C11.7199 31.8262 12.2708 32.3627 12.9857 32.4464L13.1849 32.4583H20.9983C21.7991 32.4583 22.4633 31.8262 22.4633 31.1771C22.4633 30.8675 22.3351 30.5683 22.1024 30.335C21.8697 30.1016 21.5483 29.9499 21.1975 29.9078L20.9983 29.8958ZM11.7199 23.0625C11.2019 23.0625 10.7051 23.2425 10.3387 23.5629C9.97241 23.8832 9.76662 24.3177 9.76662 24.7708C9.76662 25.2239 9.97241 25.6584 10.3387 25.9788C10.7051 26.2992 11.2019 26.4792 11.7199 26.4792C12.238 26.4792 12.7348 26.2992 13.1012 25.9788C13.4675 25.6584 13.6733 25.2239 13.6733 24.7708C13.6733 24.3177 13.4675 23.8832 13.1012 23.5629C12.7348 23.2425 12.238 23.0625 11.7199 23.0625ZM22.4633 23.0625C21.9452 23.0625 21.4484 23.2425 21.0821 23.5629C20.7157 23.8832 20.5099 24.3177 20.5099 24.7708C20.5099 25.2239 20.7157 25.6584 21.0821 25.9788C21.4484 26.2992 21.9452 26.4792 22.4633 26.4792C22.9813 26.4792 23.4782 26.2992 23.8445 25.9788C24.2108 25.6584 24.4166 25.2239 24.4166 24.7708C24.4166 24.3177 24.2108 23.8832 23.8445 23.5629C23.4782 23.2425 22.9813 23.0625 22.4633 23.0625ZM17.0916 23.0625C16.5736 23.0625 16.0767 23.2425 15.7104 23.5629C15.3441 23.8832 15.1383 24.3177 15.1383 24.7708C15.1383 25.2239 15.3441 25.6584 15.7104 25.9788C16.0767 26.2992 16.5736 26.4792 17.0916 26.4792C17.6097 26.4792 18.1065 26.2992 18.4728 25.9788C18.8392 25.6584 19.0449 25.2239 19.0449 24.7708C19.0449 24.3177 18.8392 23.8832 18.4728 23.5629C18.1065 23.2425 17.6097 23.0625 17.0916 23.0625ZM24.9049 3.41666C25.2761 3.41676 25.6334 3.54007 25.9046 3.76169C26.1759 3.98331 26.3408 4.28671 26.3661 4.61058C26.3914 4.93445 26.2752 5.25464 26.0409 5.50646C25.8067 5.75828 25.4719 5.92295 25.1042 5.9672L24.9049 5.97916H8.30162C7.9476 5.97917 7.60556 6.0913 7.33876 6.2948C7.07196 6.4983 6.89844 6.77942 6.85029 7.08616L6.83662 7.26041V14.0937C6.8365 14.4184 6.6955 14.7308 6.4421 14.9681C6.18869 15.2053 5.84179 15.3495 5.47147 15.3716C5.10115 15.3937 4.73504 15.2921 4.44711 15.0873C4.15917 14.8824 3.97088 14.5896 3.92029 14.268L3.90662 14.0937V7.26041C3.90648 6.28644 4.32911 5.34875 5.0891 4.63683C5.8491 3.92491 6.88977 3.49186 8.0008 3.4252L8.30162 3.41666H24.9049Z" fill="currentColor"/>
                                </g>
                            </svg>
                            <div class="aso-text-[10px] lg:aso-text-[13px] aso-font-medium">
                                {{props.config.data.settings.languageImages.visualizer.textSize}}
                            </div>
                        </div>
    
                        <div v-if="shapees.length > 0 && materialType == 'simple'" @click="showOptions('shape')" class="aso-w-fit aso-h-[90%] aso-flex aso-flex-col aso-full-center aso-space-y-1 aso-bg-transparent lg:aso-bg-white hover:aso-bg-[#016565] hover:aso-text-white aso-px-4 aso-rounded-lg lg:aso-shadow-[-7px_1px_15px_0px_#828282] aso-base-animation">
                            <svg class="aso-w-6 aso-h-6" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="mdi:shape">
                                <path id="Vector" d="M18.3333 23.0625V36.7292H5V23.0625H18.3333ZM20 3.41666L29.1667 18.7917H10.8333L20 3.41666ZM29.1667 22.2083C33.3333 22.2083 36.6667 25.625 36.6667 29.8958C36.6667 34.1667 33.3333 37.5833 29.1667 37.5833C25 37.5833 21.6667 34.1667 21.6667 29.8958C21.6667 25.625 25 22.2083 29.1667 22.2083Z" fill="currentColor"/>
                                </g>
                            </svg>
                            <div class="aso-text-[10px] lg:aso-text-[13px] aso-font-medium">
                                {{props.config.data.settings.languageImages.visualizer.textShape}}
                            </div>
                        </div>
    
                        <div v-if="fixinggs.length > 0" @click="showOptions('fixing-methode')" class="aso-w-fit aso-h-[90%] aso-flex aso-flex-col aso-full-center aso-space-y-1 aso-bg-transparent lg:aso-bg-white hover:aso-bg-[#016565] hover:aso-text-white aso-px-4 aso-rounded-lg lg:aso-shadow-[-7px_1px_15px_0px_#828282] aso-base-animation">
                            <svg class="aso-w-6 aso-h-6" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="uil:screw">
                                <path id="Vector" d="M36.183 16.8667L23.133 3.81666C22.9138 3.59622 22.6374 3.44147 22.3349 3.36988C22.0324 3.29829 21.716 3.31272 21.4212 3.41153C21.1265 3.51035 20.8653 3.68962 20.6671 3.92908C20.4689 4.16855 20.3417 4.45867 20.2997 4.76666L19.083 13.3333L15.7497 16.6667L15.1997 16.35C14.8408 16.1755 14.4313 16.1356 14.0455 16.2374C13.6597 16.3393 13.3232 16.5762 13.0972 16.905C12.8713 17.2339 12.7708 17.6329 12.8141 18.0296C12.8573 18.4263 13.0415 18.7942 13.333 19.0667L11.4163 21.0167L10.8663 20.7C10.5084 20.5356 10.1038 20.5033 9.72429 20.6089C9.3448 20.7144 9.01495 20.9509 8.79324 21.2765C8.57153 21.6021 8.4723 21.9956 8.51314 22.3874C8.55398 22.7792 8.73225 23.1438 9.01634 23.4167L7.06634 25.35L6.53301 25C6.34278 24.8898 6.13264 24.8183 5.91468 24.7897C5.69671 24.761 5.47524 24.7758 5.263 24.8331C5.05077 24.8904 4.85197 24.9892 4.67806 25.1237C4.50415 25.2581 4.35856 25.4257 4.24967 25.6167C4.06145 25.9599 4.00005 26.3584 4.07623 26.7424C4.15242 27.1264 4.36133 27.4713 4.66634 27.7167L3.81634 28.5667C3.662 28.7231 3.5427 28.9106 3.46634 29.1167C3.38094 29.317 3.33564 29.5322 3.33301 29.75V35C3.33301 35.442 3.5086 35.8659 3.82116 36.1785C4.13372 36.4911 4.55765 36.6667 4.99967 36.6667H10.2163C10.4341 36.664 10.6493 36.6187 10.8497 36.5333C11.0557 36.457 11.2432 36.3377 11.3997 36.1833L14.233 33.3333L14.783 33.65C14.9722 33.7609 15.1815 33.8333 15.3988 33.8632C15.6161 33.893 15.8371 33.8797 16.0492 33.824C16.2613 33.7682 16.4604 33.6712 16.6349 33.5384C16.8095 33.4055 16.9561 33.2396 17.0663 33.05C17.2609 32.7069 17.3275 32.3059 17.2543 31.9184C17.181 31.5308 16.9727 31.1818 16.6663 30.9333L18.6163 29L19.1663 29.3167C19.4154 29.4578 19.6967 29.5325 19.983 29.5333C20.302 29.5046 20.606 29.3845 20.8586 29.1875C21.1111 28.9904 21.3016 28.7248 21.4071 28.4223C21.5126 28.1199 21.5287 27.7934 21.4535 27.4821C21.3783 27.1707 21.2149 26.8876 20.983 26.6667L22.933 24.7333L23.483 25.05C23.7321 25.1912 24.0134 25.2658 24.2997 25.2667C24.64 25.2606 24.9704 25.1504 25.2462 24.951C25.5221 24.7516 25.7303 24.4725 25.8429 24.1512C25.9554 23.83 25.9669 23.4819 25.8757 23.154C25.7846 22.826 25.5952 22.5338 25.333 22.3167L26.6497 21L35.233 19.7833C35.5415 19.7395 35.8315 19.6101 36.0701 19.4097C36.3087 19.2094 36.4864 18.9462 36.583 18.65C36.6973 18.3461 36.7203 18.0154 36.6492 17.6986C36.5782 17.3818 36.4161 17.0926 36.183 16.8667ZM9.53301 33.3333H6.66634V30.4667L7.61634 29.5167L11.2497 31.6667L9.53301 33.3333ZM13.683 29.1667L9.99967 27.0833L11.8997 25.1833L15.5163 27.2667L13.683 29.1667ZM18.033 24.8333L14.3997 22.7333L16.3163 20.8333L19.9997 22.9167L18.033 24.8333ZM22.383 20.4833L18.7497 18.3333L20.6497 16.4333L23.5163 19.3L22.383 20.4833ZM26.4663 17.5833L22.4163 13.5333L23.133 8.53333L31.4663 16.8667L26.4663 17.5833Z" fill="currentColor"/>
                                </g>
                            </svg>
                            <div class="aso-text-[10px] lg:aso-text-[13px] aso-font-medium aso-whitespace-nowrap">
                                {{props.config.data.settings.languageImages.visualizer.textFixingMethods}}
                            </div>
                        </div>

                        <div v-if="borderrs.length > 0 && materialType == 'simple'" @click="showOptions('border')" class="aso-w-fit aso-h-[90%] aso-flex aso-flex-col aso-full-center aso-space-y-1 aso-bg-transparent lg:aso-bg-white hover:aso-bg-[#016565] hover:aso-text-white aso-px-4 aso-rounded-lg lg:aso-shadow-[-7px_1px_15px_0px_#828282] aso-base-animation">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6" />
                            </svg>
                            <div class="aso-text-[10px] lg:aso-text-[13px] aso-font-medium">
                                {{props.config.data.settings.languageImages.visualizer.textBorder}}
                            </div>
                        </div>
    
                        <div v-if="colorrs.length > 0" @click="showOptions('color')" class="aso-w-fit aso-h-[90%] aso-flex aso-flex-col aso-full-center aso-space-y-1 aso-bg-transparent lg:aso-bg-white hover:aso-bg-[#016565] hover:aso-text-white aso-px-4 aso-rounded-lg lg:aso-shadow-[-7px_1px_15px_0px_#828282] aso-base-animation">
                            <svg class="aso-w-6 aso-h-6" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="tdesign:fill-color-1">
                                <path id="Vector" d="M20.0004 0.0888367L39.9137 20.5L36.6671 23.8278V23.9167H36.5804L24.7137 36.08C23.4635 37.3611 21.7682 38.0807 20.0004 38.0807C18.2326 38.0807 16.5373 37.3611 15.2871 36.08L4.8004 25.3329C4.18131 24.6983 3.69021 23.945 3.35516 23.1159C3.02011 22.2869 2.84766 21.3983 2.84766 20.5009C2.84766 19.6035 3.02011 18.7149 3.35516 17.8858C3.69021 17.0567 4.18131 16.3034 4.8004 15.6688L12.1971 8.08554L7.64373 3.41667L10.0004 1.00109L14.5554 5.66996L20.0004 0.0888367ZM14.5554 10.5028L7.15873 18.0844C6.50873 18.7507 6.18207 19.6253 6.18207 20.5H35.1987L20.0004 4.92L16.9137 8.08554L22.3571 13.6667L20.0004 16.0823L14.5554 10.5028ZM8.13373 23.9167L17.6437 33.6644C18.2688 34.3049 19.1165 34.6648 20.0004 34.6648C20.8843 34.6648 21.732 34.3049 22.3571 33.6644L31.8671 23.9167H8.13373ZM36.2504 31.4145L38.4404 34.2504C39.4087 35.5043 39.4087 37.4074 38.4404 38.6596C38.1824 39.0048 37.8511 39.2852 37.4717 39.4797C37.0922 39.6741 36.6746 39.7775 36.2504 39.782C35.3671 39.782 34.5837 39.3378 34.0604 38.6596C33.0921 37.4074 33.0921 35.5043 34.0604 34.2504L36.2504 31.4145Z" fill="currentColor"/>
                                </g>
                            </svg>
                            <div class="aso-text-[10px] lg:aso-text-[13px] aso-font-medium">
                                {{props.config.data.settings.languageImages.visualizer.textColor}}
                            </div>
                        </div>
    
                        <div v-if="(materialType == 'simple' && currentMaterialTextImages.enableText && sizees.length > 0 ) || materialType == 'advance'" @click="showOptions('text')" class="aso-w-fit aso-h-[90%] aso-flex aso-flex-col aso-full-center aso-space-y-1 aso-bg-transparent lg:aso-bg-white hover:aso-bg-[#016565] hover:aso-text-white aso-px-4 aso-rounded-lg lg:aso-shadow-[-7px_1px_15px_0px_#828282] aso-base-animation">
                            <svg class="aso-w-6 aso-h-6" viewBox="0 0 46 47" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                            <div class="aso-text-[10px] lg:aso-text-[13px] aso-font-medium">
                                {{props.config.data.settings.languageImages.visualizer.textOptionText}}
                            </div>
                        </div>
    
                        <div v-if="(materialType == 'simple' && currentMaterialTextImages.enableImage && sizees.length > 0 ) || materialType == 'advance'" @click="showOptions('image')" class="aso-w-fit aso-h-[90%] aso-flex aso-flex-col aso-full-center aso-space-y-1 aso-bg-transparent lg:aso-bg-white hover:aso-bg-[#016565] hover:aso-text-white aso-px-4 aso-rounded-lg lg:aso-shadow-[-7px_1px_15px_0px_#828282] aso-base-animation">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                            <div class="aso-text-[10px] lg:aso-text-[13px] aso-font-medium">
                                {{props.config.data.settings.languageImages.visualizer.textImage}}
                            </div>
                        </div>
                    </div>

                    <!-- <div v-show="!isLoaded" class="aso-absolute aso-right-0 lg:aso-translate-x-[90%] aso-shadow-[1px_1px_7px_1px_rgba(0,0,0,0.1)] lg:aso-shadow-none lg:aso-h-fit lg:aso-w-fit lg:aso-mr-2 aso-flex aso-full-center aso-rounded-lg">
                        <div class="aso-flex lg:aso-h-fit lg:aso-w-fit aso-p-2 aso-bg-[#016464] lg:aso-bg-[#80acac] hover:aso-bg-[#016464] aso-text-black hover:aso-text-white aso-rounded-lg aso-base-animation">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="aso-w-7 aso-h-7">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </div>
                    </div> -->
                </div>

                <div v-show="showOption" id="aso-options-container" class="aso-relative lg:aso-absolute lg:aso-left-4 lg:aso-top-[20%] lg:aso-translate-y-[-20%] aso-w-full lg:aso-w-[30%] aso-h-[32%] lg:aso-h-[70%] aso-bg-white aso-rounded-md aso-shadow-xl">
                    <div class="aso-hidden lg:aso-flex aso-absolute aso-top-0 aso-right-0 aso-w-fit aso-h-fit">
                        <span @click="closeOption" class="aso-flex aso-bg-[#016464] aso-text-white hover:aso-bg-[#029797] aso-p-1 aso-rounded-md aso-base-animation">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="aso-w-5 aso-h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </span>
                    </div>

                    <div v-show="step == 'material'" class="aso-flex aso-flex-col lg:aso-space-y-3 aso-w-full aso-h-full" id="aso-materials-section">
                        <p class="aso-hidden lg:aso-flex aso-bg-[#016464] aso-text-white aso-text-lg aso-font-semibold aso-p-2 aso-px-4">Materials</p>    

                        <div class="aso-w-full aso-h-full aso-p-4 aso-overflow-auto aso-scrollBar">
                            <div v-for="(material, index) in props.config.data.materials" class="aso-space-y-3">
                                <input type="radio" :id="material.name + index" name="aso-material" class=" peer aso-hidden" @change="selectMaterial(material)">
                                <label :for="material.name + index" class="aso-flex aso-full-center aso-space-x-2">
                                    <div :class="`${material.icon != '' ? `` : `aso-bg-lime-400 aso-rounded-md`} aso-w-1/4 aso-h-20`">
                                        <img v-if="material.icon != ''" :src="material.icon" class="aso-w-full aso-h-full" />
                                    </div>                                
                                    <div class="aso-w-3/4 aso-flex aso-flex-col aso-space-y-1">
                                        <p class="aso-text-sm aso-text-black aso-font-medium first-letter:aso-uppercase">{{ material.name }}</p>
                                        <p class="aso-text-xs">{{ material.description }}</p>
                                        <div class="aso-w-full aso-flex aso-items-center aso-justify-between">
                                            <span v-if="material.popImg != ''" class="aso-text-xs aso-text-red-500 aso-underline aso-cursor-pointer">example</span>
                                            <span v-if="material.popImg == ''" class="aso-invisible">example</span>                                        
                                            <span :class="`${selectedMaterial == material.name ? `aso-bg-[#016464] aso-text-white` : `aso-text-transparent`} aso-flex aso-w-fit aso-h-fit aso-p-1 aso-border-2 aso-rounded-full`">
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

                    <div v-show="step == 'component'" class="aso-flex aso-flex-col lg:aso-space-y-3 aso-w-full aso-h-full" id="aso-products-section">
                        <p class="aso-hidden lg:aso-flex aso-bg-[#016464] aso-text-white aso-text-lg aso-font-semibold aso-p-2 aso-px-4">{{advancedComponent.name}}</p>    
                        <div class="aso-w-full aso-h-full aso-p-4 aso-overflow-auto aso-scrollBar">
                            <div v-for="(option, index) in advancedComponent.options" class="aso-space-y-3">
                                <input type="radio" :id="option.name + index" name="aso-fixings" class=" peer aso-hidden" @change="selectSignModel(option)">
                                <label :for="option.name + index" class="aso-flex aso-full-center aso-space-x-2">
                                        <div :class="`${option.icon != '' ? `` : `aso-bg-lime-400 aso-rounded-md`} aso-w-1/4 aso-h-20`">
                                            <img v-if="option.icon != ''" :src="option.icon" class="aso-w-full aso-h-full" />
                                        </div>                                
                                        <div class="aso-w-3/4 aso-flex aso-flex-col aso-space-y-1">
                                        <p class="aso-text-sm aso-text-black aso-font-medium first-letter:aso-uppercase">{{ option.name }}</p>
                                        <p class="aso-text-xs">{{ option.description }}</p>
                                        <p class="aso-text-xs">{{ option.size.width }}x{{ option.size.height }}</p>
                                        <div class="aso-w-full aso-flex aso-items-center aso-justify-between">
                                            <span v-if="option.popImg != ''" class="aso-text-xs aso-text-red-500 aso-underline aso-cursor-pointer">example</span>
                                            <span v-if="option.popImg == ''" class="aso-invisible">example</span>
                                            <span :class="`${activeSignModelName == option.name ? `aso-bg-[#016464] aso-text-white` : `aso-text-transparent`} aso-flex aso-w-fit aso-h-fit aso-p-1 aso-border-2 aso-rounded-full`">
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

                    <div v-show="step == 'size'" class="aso-flex aso-flex-col lg:aso-space-y-2 aso-w-full aso-h-full" id="aso-sizes-section">
                        <p class="aso-hidden lg:aso-flex aso-bg-[#016464] aso-text-white aso-text-lg aso-font-semibold aso-p-2 aso-px-4">Sizes</p>    

                        <div class="aso-w-full aso-h-full aso-space-y-2 aso-p-4 aso-overflow-auto aso-scrollBar">
                            <div class="aso-space-y-2">
                                <p class="aso-font-medium">Suggestions</p>
                                <div @click="dropSizeToggle()" id="aso-fontSelected-dropdown" :class="`aso-w-full aso-cursor-pointer aso-items-center aso-space-x-3 aso-text-zinc-800 aso-px-2 aso-border-solid aso-border-2 aso-border-zinc-800 aso-rounded-md aso-flex aso-justify-between aso-text-base aso-base-animation`">
                                    <div class="aso-w-fit aso-flex aso-items-center aso-justify-center aso-p-2">
                                        <p :class="`lg:aso-text-sm aso-font-semibold`" >{{ currentSizeName }}</p>
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
                                <div v-show="showSize">
                                    <div class="aso-flex aso-flex-wrap aso-gap-2 aso-p-1">
                                        <div v-for="(sizee, id) in sizees">
                                            <div v-for="(size, index) in allSizes" :key="size.name" class="aso-w-full aso-flex" >
                                                <div v-if="sizee.manageSizeId == index" class="aso-w-full aso-h-full aso-flex">
                                                    <input type="radio" :id="size.width + index" name="aso-sizes" class=" peer aso-hidden" @change="changeSize(size, sizee, id)">
                                                    <label :for="size.width + index" :class="`${currentSizeName == size.label ? `aso-text-[#FFBC3C] aso-border-[#FFBC3C]` : `aso-text-zinc-800 aso-border-zinc-800`} 
                                                        aso-w-full aso-h-full aso-border-solid aso-border aso-justify-center aso-font-semibold aso-text-sm hover:aso-text-[#FFBC3C] hover:aso-border-[#FFBC3C] aso-rounded-md aso-p-2 aso-text-center aso-cursor-pointer aso-transition-all aso-ease-in-out aso-duration-500`"
                                                    >
                                                        {{ size.label }}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div v-if="customSizeActive" class="aso-space-y-2 aso-w-full">
                                <p class="aso-text-base aso-font-semibold">{{props.config.data.settings.languageImages.visualizer.customSize}}</p>
                                <div class="aso-flex aso-justify-between aso-items-center aso-space-x-2 ">
                                    <div class="aso-w-1/2 aso-flex aso-flex-col aso-space-y-2">
                                        <label class="aso-text-xs" for="sizeWidth">{{ customSizes.width.label }}</label>
                                        <input class="aso-w-full aso-border aso-border-zinc-600 aso-p-1 aso-rounded-sm" type="number" name="" id="sizeWidth" :min="customSizes.width.min" :max="customSizes.width.max" v-model="customSizeValues.width">
                                    </div>
                                    <!-- <p class="aso-px-2">x</p> -->
                                    <div class="aso-w-1/2 aso-flex aso-flex-col aso-space-y-2">
                                        <label class="aso-text-xs" for="sizeHeight">{{ customSizes.height.label }}</label>
                                        <input class="aso-w-full aso-border aso-border-zinc-600 aso-p-1 aso-rounded-sm" type="number" name="" id="sizeHeight" :min="customSizes.height.min" :max="customSizes.height.max" v-model="customSizeValues.height">
                                    </div>
                                </div>
                                <span @click="changeSize(customSizeValues)" class="aso-w-full aso-flex aso-bg-[#016464] aso-text-white hover:aso-bg-[#029797] font-semi-bold aso-text-sm aso-full-center aso-border aso-px-2 aso-p-1 aso-rounded-md aso-base-animation">{{props.config.data.settings.languageImages.visualizer.customSizeButtonDone}}</span>
                            </div>

                            <div v-if="currentSizeThickness" class="aso-space-y-2">
                                <p class="aso-text-base aso-font-semibold">{{props.config.data.settings.languageImages.visualizer.thickness}}</p>
                                <div class="aso-flex aso-space-x-2">
                                    <div class="aso-w-full aso-flex aso-flex-col aso-space-y-2">
                                        <input class="aso-w-full aso-border aso-border-zinc-600 aso-p-1 aso-rounded-sm" type="number" name="" id="aso-thickness" :min="currentSize.thickness" :max="currentSize.thickness" :value="currentSize.thickness" disabled >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-show="step == 'shape'" class="aso-flex aso-flex-col lg:aso-space-y-2 aso-w-full aso-h-full" id="aso-shapes">
                        <p class="aso-hidden lg:aso-flex aso-bg-[#016464] aso-text-white aso-text-lg aso-font-semibold aso-p-2 aso-px-4">Shapes</p>    

                        <div class="aso-w-full aso-h-full aso-overflow-auto aso-scrollBar">
                            <div class="aso-grid aso-grid-cols-3 lg:aso-grid-cols-3 aso-gap-2 aso-w-full aso-full-center">
                                <div v-for="(shapee, id) in shapees">
                                    <div v-for="(shape, index) in allShapes" :key="shape.name" class="aso-w-full aso-flex">
                                        <div class="aso-w-full aso-flex" v-if="shapee.shapeId == index">
                                            <input type="radio" :id="shape.name + index" name="aso-shape" class="peer aso-hidden" @change="selectShape(shape.value, currentSizeValues.width, currentSizeValues.height, currentSizeValues.top, currentSizeValues.left)">
                                            <label :for="shape.name + index" :class="`${selectedShape == shape.type ? `aso-text-[#016464]` : `aso-text-zinc-800 aso-border-zinc-800`} 
                                                aso-w-full aso-h-full aso-flex aso-flex-col aso-space-y-2 aso-full-center aso-font-semibold aso-text-sm hover:aso-text-[#016464] aso-rounded-md aso-p-2 aso-text-center aso-cursor-pointer aso-transition-all aso-ease-in-out aso-duration-500`"
                                            >
                                                <div :class="`${shape.icon != '' ? `` : `aso-bg-lime-400 aso-rounded-md`} aso-w-16 aso-h-16`">
                                                    <img v-if="shape.icon != ''" :src="shape.icon" class="aso-w-full aso-h-full" />
                                                </div>
                                                <p>{{shape.name}}</p>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-show="step == 'fixing-methode'" class="aso-flex aso-flex-col lg:aso-space-y-1 aso-w-full aso-h-full" id="aso-fixings-section">
                        <p class="aso-hidden lg:aso-flex aso-bg-[#016464] aso-text-white aso-text-lg aso-font-semibold aso-p-2 aso-px-4">Fixings</p>    

                        <div v-if="materialType == 'simple'" class="aso-w-full aso-h-full aso-p-4 aso-overflow-auto aso-scrollBar">
                            <div v-for="(fixingg, id) in fixinggs">
                                <div v-for="(fixing, index) in allFixings">
                                    <div v-if="fixingg.fixingMethodId == index" class="aso-space-y-3 aso-w-full aso-h-full">
                                        <input type="radio" :id="fixing.name + index" name="aso-fixings" class=" peer aso-hidden" @change="selectFixingMethode(fixing.type)">
                                        <label :for="fixing.name + index" class="aso-flex aso-full-center aso-space-x-2">
                                            <div :class="`${fixing.icon != '' ? `` : `aso-bg-lime-400 aso-rounded-md`} aso-w-1/4 aso-h-20`">
                                                <img v-if="fixing.icon != ''" :src="fixing.icon" class="aso-w-full aso-h-full" />
                                            </div>
                                            <div class="aso-w-3/4 aso-flex aso-flex-col aso-space-y-1">
                                                <p class="aso-text-sm aso-text-black aso-font-medium first-letter:aso-uppercase">{{ fixing.name }}</p>
                                                <p class="aso-text-xs">{{ fixing.description }}</p>
                                                <div class="aso-w-full aso-flex aso-items-center aso-justify-between">
                                                    <span v-if="fixing.popImg != ''" class="aso-text-xs aso-text-red-500 aso-underline aso-cursor-pointer">example</span>
                                                    <span v-if="fixing.popImg == ''" class="aso-invisible">example</span>
                                                    <span :class="`${activeFixingMethode == fixing.type ? `aso-bg-[#016464] aso-text-white` : `aso-text-transparent`} aso-flex aso-w-fit aso-h-fit aso-p-1 aso-border-2 aso-rounded-full`">
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

                        <div v-if="materialType == 'advance'" class="aso-w-full aso-h-full aso-p-4 aso-overflow-auto aso-scrollBar">
                            <div v-for="(fixingId) in fixinggs">
                                <div v-for="(fixing, index) in allFixings">
                                    <div v-if="fixingId == index" class="aso-space-y-3">
                                        <input type="radio" :id="fixing.name + index" name="aso-fixings" class=" peer aso-hidden" @change="selectFixingMethode(fixing.type)">
                                        <label :for="fixing.name + index" class="aso-flex aso-full-center aso-space-x-2">
                                            <div :class="`${fixing.icon != '' ? `` : `aso-bg-lime-400 aso-rounded-md`} aso-w-1/4 aso-h-20`">
                                                <img v-if="fixing.icon != ''" :src="fixing.icon" class="aso-w-full aso-h-full" />
                                            </div>
                                            <div class="aso-w-3/4 aso-flex aso-flex-col aso-space-y-1">
                                                <p class="aso-text-sm aso-text-black aso-font-medium first-letter:aso-uppercase">{{ fixing.name }}</p>
                                                <p class="aso-text-xs">{{ fixing.description }}</p>
                                                <div class="aso-w-full aso-flex aso-items-center aso-justify-between">
                                                    <span v-if="fixing.popImg != ''" class="aso-text-xs aso-text-red-500 aso-underline aso-cursor-pointer">example</span>
                                                    <span v-if="fixing.popImg == ''" class="aso-invisible">example</span>
                                                    <span :class="`${activeFixingMethode == fixing.type ? `aso-bg-[#016464] aso-text-white` : `aso-text-transparent`} aso-flex aso-w-fit aso-h-fit aso-p-1 aso-border-2 aso-rounded-full`">
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
                        <p class="aso-hidden lg:aso-flex aso-bg-[#016464] aso-text-white aso-text-lg aso-font-semibold aso-p-2 aso-px-4">Colors options</p>    

                        <div v-if="materialType == 'simple'" class="aso-w-full aso-h-full aso-space-y-2 aso-p-3 aso-overflow-auto aso-scrollBar">
                            <p class="aso-font-medium" >List of colors</p>
                            <div class="aso-flex aso-flex-wrap aso-gap-2 aso-p-1">
                                <div v-for="(colorr, id) in colorrs">
                                    <div v-for="(color, index) in allColors" >
                                        <div v-if="colorr.manageColorId == index" @click="changeSignColor(color, colorr)" :class="`${activeSignColor == color.name ? `aso-border-4 aso-border-[#016464]` : `` } aso-w-16 aso-h-16 aso-bg-[${color.backgroundColor}] aso-flex aso-full-center aso-font-bold aso-text-lg aso-text-[${color.textColor}] aso-rounded-full aso-cursor-pointer`"> C </div>
                                    </div>
                                </div>
                                <!-- <label for="setColor" :class="`${activeSignColor == 'custom' ? `aso-border-4 aso-border-solid aso-border-[#016464]` : `` } aso-w-10 aso-h-10 aso-bg-[${simpleColor}] aso-flex aso-full-center aso-rounded-full`">
                                    <input id="setColor" type="color" v-model="simpleColor" class="aso-invisible" @change="changeSignColor({name: 'custom', code: simpleColor})"/>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" :fill="simpleColor" class="aso-w-11 aso-h-11">
                                        <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clip-rule="evenodd" />
                                    </svg>
                                </label> -->
                            </div>
                        </div>

                        <div v-if="materialType == 'advance'" class="aso-w-full aso-h-full aso-p-3 aso-overflow-auto aso-scrollBar">
                            <p class="aso-font-medium" >List of colors</p>
                            <div class="aso-flex aso-flex-wrap aso-gap-2 aso-p-1">
                                <div v-for="(colorr, id) in colorrs" class="aso-space-y-2 aso-full-center">
                                    <div class="aso-w-16 aso-h-16 aso-rounded-full aso-overflow-hidden">
                                        <img :src="colorr.image" class="aso-w-full aso-h-full" />
                                    </div>
                                    <!-- <div>{{ colorr.color.name }}</div> -->
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-show="step == 'border'" class="aso-flex aso-flex-col lg:aso-space-y-2 aso-w-full aso-h-full" id="aso-borders-section">
                        <p class="aso-hidden lg:aso-flex aso-bg-[#016464] aso-text-white aso-text-lg aso-font-semibold aso-p-2 aso-px-4">Border</p>    

                        <div class="aso-w-full aso-h-full aso-p-2 aso-overflow-auto aso-scrollBar">
                            <div class="aso-flex aso-flex-wrap aso-gap-2 aso-p-1">
                                <div v-for="(borderr, id) in borderrs">
                                    <div v-for="(border, index) in allBorders" :key="border.name" class="aso-w-full aso-flex">
                                        <div v-if="borderr.manageBorderId == index && !borderr.excludeSizes.includes(currentSizeId)">
                                            <input type="radio" :id="'border' + border.name + index" name="aso-borders" class="peer aso-hidden" @change="selectBorder(border.value, borderr.settings.codeHex)">
                                            <label :for="'border' + border.name + index" :class="`${activeBorder == border.value ? `aso-text-[#016464]` : `aso-text-zinc-800 aso-border-zinc-800`} 
                                                aso-w-full aso-h-full aso-flex aso-flex-col aso-space-y-1 aso-full-center aso-font-semibold aso-text-sm hover:aso-text-[#016464] aso-rounded-md aso-p-2 aso-text-center aso-cursor-pointer aso-transition-all aso-ease-in-out aso-duration-500`"
                                            >
                                                <div :class="`${border.icon != '' ? `` : `aso-bg-lime-400 aso-rounded-md`} aso-w-16 aso-h-16 aso-bg-lime-400`">
                                                    <img v-if="border.icon != ''" :src="border.icon" class="aso-w-full aso-h-full" />
                                                </div>
                                                <p>{{border.name}}</p>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-show="step == 'text'" class="aso-flex aso-flex-col lg:aso-space-y-3 aso-w-full aso-h-full" id="aso-texts-section">
                        <p class="aso-hidden lg:aso-flex aso-bg-[#016464] aso-text-white aso-text-lg aso-font-semibold aso-p-2 aso-px-4">Text</p>    

                        <div class="aso-w-full aso-h-full aso-overflow-auto aso-scrollBar aso-space-y-2 aso-p-3">
                            
                            <div class="aso-w-full aso-bg-zinc-200 aso-flex aso-flex-col aso-space-y-3 aso-full-center aso-p-4">
                                <span v-show="selectText" @click="changeText" class="aso-w-3/4 aso-flex aso-full-center aso-space-x-3 aso-text-[#016464] aso-border aso-border-solid aso-border-[#016464] aso-text-md aso-p-2 aso-px-4 aso-rounded-full aso-cursor-pointer">
                                    <p class="aso-text-center">Change text</p>
                                </span>

                                <span @click="addTextToSign()" class="aso-w-3/4 aso-flex aso-full-center aso-space-x-3 aso-bg-[#016464] hover:aso-bg-[#018888] aso-border aso-text-white aso-text-md aso-p-2 aso-px-4 aso-rounded-full aso-cursor-pointer aso-base-animation">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="aso-w-5 aso-h-5">
                                        <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clip-rule="evenodd" />
                                    </svg>
                                    <p class="aso-text-center">Add new text</p>
                                </span>
                            </div>

                            <div v-show="!selectText">
                                <p class="aso-font-medium" v-show="addedTexts.length > 0">Text added</p>
                                <div class="aso-p-2 aso-space-y-2">
                                    <div v-for="(textObject, index) in addedTexts">
                                        <div :class="`${activeFace == textObject.canvas.name ? `aso-cursor-pointer` : `aso-cursor-not-allowed`} aso-bg-zinc-100 aso-p-2`" @click="getTextObject(textObject)">
                                            <p class="aso-text-sm">Text object {{ index }}</p>
                                            <p class="aso-text-xs">{{textObject.text}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div v-show="selectText">
                                <textarea name="" id="aso-text-editor" class="aso-h-12 aso-w-full aso-border aso-border-zinc-600 aso-p-1 aso-rounded-sm" v-model="selectedText.value" @input="changeTextValue"></textarea>
                                <!-- <div>{{ selectedText.value }}</div> -->

                                <div class="aso-space-y-1">
                                    <p class="aso-font-medium">Font</p>
                                    <div @click="dropFontToggle()" id="aso-fontSelected-dropdown" :class="`aso-w-full aso-cursor-pointer aso-items-center aso-space-x-3 aso-bg-[#016464] hover:aso-bg-[#029797] aso-text-white  aso-px-2 aso-border border-gray-400 aso-rounded-md aso-flex aso-justify-between aso-text-base aso-base-animation`">
                                        <div class="aso-w-fit aso-flex aso-items-center aso-justify-center aso-p-2">
                                            <p v-show="fontFamSelected != ''" :class="`aso-font-[${fontFamSelected}] lg:aso-text-sm `" >{{ fontFamSelected }}</p>
                                            <p v-show="fontFamSelected == ''" class="lg:aso-text-sm xl:aso-text-base" >Selected font</p>
                                        </div>
                                        <div class="aso-flex aso-items-center aso-justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6 lg:w-5 lg:aso-h-5">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                            </svg>                                  
                                        </div>
                                    </div>
                                    <div v-show="showFont" class="aso-flex aso-flex-wrap aso-gap-2 aso-p-1">
                                        <div class="aso-flex aso-items-center aso-justify-center aso-w-fit aso-h-10" v-for="(font, index) in allFonts">
                                            <input type="radio" :id="font.label + index + 1" name="aso-fonts" class=" peer aso-hidden " @change="changeTextFontFam(font.label, index)">
                                            <label :for="font.label + index + 1" :class="`${fontFamSelected == font.label ? `aso-text-[#FFBC3C] aso-border-[#FFBC3C]` : `aso-text-zinc-800 aso-border-zinc-800`} 
                                                aso-font-[${font.label}] aso-w-full aso-h-full aso-border-solid aso-border aso-justify-center aso-font-semibold aso-text-sm hover:aso-text-[#FFBC3C] hover:aso-border-[#FFBC3C] aso-rounded-md aso-p-2 aso-text-center aso-cursor-pointer aso-transition-all aso-ease-in-out aso-duration-500`"
                                                >
                                                {{font.label}}
                                            </label>
                                        </div>
                                    </div>

                                </div>

                                <div class="aso-w-full aso-flex aso-justify-between">
                                    <div v-if="configTextSettings.enableTextAlignment" :class="`${!configTextFontSettings.active ? `aso-w-full` : `aso-w-[45%]`} aso-space-y-2`">
                                        <p class="aso-font-medium">Text alignment</p>
                                        <div class="aso-flex aso-w-full">
                                            <span @click="changeTextAlign('left')" :class="`${selectedText.align == 'left' ? 'aso-bg-[#016464] aso-text-white' : 'aso-bg-white aso-text-black'} hover:aso-bg-[#016464] hover:aso-text-white aso-w-1/3 aso-flex aso-full-center aso-p-1 aso-border aso-base-animation`">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                                                </svg>
                                            </span>
                                            <span @click="changeTextAlign('center')" :class="`${selectedText.align == 'center' ? 'aso-bg-[#016464] aso-text-white' : 'aso-bg-white aso-text-black'} hover:aso-bg-[#016464] hover:aso-text-white aso-w-1/3 aso-flex aso-full-center aso-p-1 aso-border aso-base-animation`">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                                </svg>
                                            </span>
                                            <span @click="changeTextAlign('right')" :class="`${selectedText.align == 'right' ? 'aso-bg-[#016464] aso-text-white' : 'aso-bg-white aso-text-black'} hover:aso-bg-[#016464] hover:aso-text-white aso-w-1/3 aso-flex aso-full-center aso-p-1 aso-border aso-base-animation`">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div v-show="configTextFontSettings.active" :class="`${!configTextSettings.enableTextAlignment ? `aso-w-full` : `aso-w-[45%]`} aso-space-y-2`">
                                        <p class="aso-font-medium">Size</p>
                                        <div class="aso-flex aso-w-full">
                                            <input type="number" name="" id="aso-text-size" class="aso-w-full aso-border aso-border-zinc-600 aso-p-1 aso-rounded-sm" :min="configTextFontSettings.minimunFontSize" :max="configTextFontSettings.maximumFontSize" v-model="selectedText.size" @input="changeTextSize(configTextFontSettings.minimunFontSize, configTextFontSettings.maximumFontSize)">
                                        </div>
                                    </div>
                                </div>

                                <div v-if="!signTextColor" class="aso-space-y-1">
                                    <p class="aso-font-medium">Color</p>
                                    <div class="aso-w-full aso-flex aso-flex-wrap aso-gap-2 aso-items-center aso-p-1 aso-border">
                                        <div v-for="(color, index) in configTextSettings.colors" class="">
                                            <div @click="changeTextColor(color.codeHex)" :class="`aso-w-8 aso-h-8 aso-bg-[${color.codeHex}] aso-p-2 aso-rounded-sm aso-border`"></div>
                                        </div>
                                    </div>
                                </div>

                                <div class="aso-space-y-1">
                                    <p class="aso-font-medium">Other custom</p>
                                    <div class="aso-w-full aso-flex aso-items-center">
                                        <div class="aso-flex aso-flex-wrap aso-gap-3">
                                            <span @click="cloneObject()" class="aso-flex aso-flex-col aso-full-center aso-space-y-1 hover:aso-text-[#016464]">
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
                                                <p class="aso-text-xs aso-font-semibold">Clone</p>
                                            </span>

                                            <span @click="deleteObject()" class="aso-flex aso-flex-col aso-full-center aso-space-y-1 hover:aso-text-[#016464]">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-7 aso-h-7">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                                <p class="aso-text-xs aso-font-semibold">Delete</p>
                                            </span>

                                            <span v-if="configTextSettings.enableBold" @click="changeTextWeight" :class="`${selectedText.weight == 'bold' ? 'aso-text-[#016464]' : ''} aso-flex aso-flex-col aso-full-center aso-space-y-1 hover:aso-text-[#016464]`">
                                                <svg  fill="none" xmlns="http://www.w3.org/2000/svg" class="aso-w-7 aso-h-7">
                                                    <path d="M12.0151 1.84998C15.2551 1.84998 17.6851 2.25498 19.3051 3.19998C21.0601 4.14498 21.8701 5.76498 21.8701 8.05998C21.8701 9.40998 21.4651 10.625 20.9251 11.57C20.619 12.0316 20.2214 12.4255 19.757 12.7274C19.2926 13.0292 18.7712 13.2326 18.2251 13.325C18.9968 13.5052 19.7289 13.8255 20.3851 14.27C20.9251 14.675 21.4651 15.35 21.8701 16.025C22.2926 17.0029 22.4776 18.0669 22.4101 19.13C22.4578 20.1053 22.2749 21.0781 21.8761 21.9694C21.4773 22.8608 20.874 23.6455 20.1151 24.26C18.1933 25.6325 15.8569 26.3 13.5001 26.15H4.45508V1.84998H12.0151ZM12.5551 11.435C14.0401 11.435 15.1201 11.3 15.6601 10.76C16.3351 10.355 16.6051 9.54497 16.6051 8.73497C16.6051 7.78998 16.2001 7.11497 15.5251 6.70998C14.8501 6.30498 13.7701 6.03498 12.2851 6.03498H9.58508V11.435H12.5551ZM9.58508 15.485V22.1H12.9601C14.4451 22.1 15.6601 21.695 16.2001 21.155C16.8751 20.48 17.1451 19.805 17.1451 18.725C17.1612 18.3169 17.0845 17.9105 16.9208 17.5364C16.7571 17.1622 16.5107 16.8301 16.2001 16.565C15.5251 16.025 14.4451 15.755 12.8251 15.755H9.45008L9.58508 15.485Z" fill="currentColor"/>
                                                </svg>
                                                <p class="aso-text-xs aso-font-semibold">Bold</p>
                                            </span>

                                            <span v-if="configTextSettings.enableItalic" @click="changeTextStyle" :class="`${selectedText.style == 'italic' ? 'aso-text-[#016464]' : ''} aso-flex aso-flex-col aso-full-center aso-space-y-1 hover:aso-text-[#016464]`">
                                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="aso-w-7 aso-h-7">
                                                    <path d="M11 5H17M7 19H13M14 5L10 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg>
                                                <p class="aso-text-xs aso-font-semibold">Italic</p>
                                            </span>

                                            <span v-if="configTextSettings.enableUnderline" @click="underlineText" :class="`${selectedText.style == 'italic' ? 'aso-text-[#016464]' : ''} aso-flex aso-flex-col aso-full-center aso-space-y-1 hover:aso-text-[#016464]`">
                                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="aso-w-7 aso-h-7">
                                                    <path d="M7 5V10C7 11.3261 7.52678 12.5979 8.46447 13.5355C9.40215 14.4732 10.6739 15 12 15C13.3261 15 14.5979 14.4732 15.5355 13.5355C16.4732 12.5979 17 11.3261 17 10V5M5 19H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg>
                                                <p class="aso-text-xs aso-font-semibold">Underline</p>
                                            </span>

                                            <span v-if="configTextSettings.enableStrike" @click="crossText" :class="`${selectedText.style == 'italic' ? 'aso-text-[#016464]' : ''} aso-flex aso-flex-col aso-full-center aso-space-y-1 hover:aso-text-[#016464]`">
                                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="aso-w-7 aso-h-7">
                                                    <path d="M7 8V13M7 13C7 14.3261 7.52678 15.5979 8.46447 16.5355C9.40215 17.4732 10.6739 18 12 18C13.3261 18 14.5979 17.4732 15.5355 16.5355C16.4732 15.5979 17 14.3261 17 13M7 13H17M17 13V8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                    <line x1="3.79883" y1="13" x2="20.1988" y2="13" stroke="currentColor"/>
                                                </svg>
                                                <p class="aso-text-xs aso-font-semibold">Crossline</p>
                                            </span>

                                            <span v-if="configTextSettings.enableOverline" @click="overlineText" :class="`${selectedText.style == 'italic' ? 'aso-text-[#016464]' : ''} aso-flex aso-flex-col aso-full-center aso-space-y-1 hover:aso-text-[#016464]`">
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

                    <div v-show="step == 'image'" class="aso-flex aso-flex-col lg:aso-space-y-3 aso-w-full aso-h-full" id="aso-images-section">
                        <p class="aso-hidden lg:aso-flex aso-bg-[#016464] aso-text-white aso-text-lg aso-font-semibold aso-p-2 aso-px-4">Images</p>    

                        <div class="aso-w-full aso-h-full aso-space-y-2 aso-p-2 aso-overflow-auto aso-scrollBar">
                            <div class="aso-w-full aso-bg-zinc-200 aso-flex aso-flex-col aso-space-y-3 aso-full-center aso-p-4">
                                <span v-if="configImageSettingsClipart.active" @click="() =>{editImage = false; showClipart = false}" class="aso-w-3/4 aso-flex aso-full-center aso-space-x-3 aso-bg-[#016464] aso-text-white aso-text-md aso-p-2 aso-px-4 aso-rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                    </svg>
                                    <p class="aso-text-center">Browse archive image</p>
                                </span>

                                <label v-show="configImageSettings.enableUploadImage" class="aso-w-3/4 aso-flex aso-full-center aso-space-x-3 aso-text-[#016464] aso-border aso-border-solid aso-border-[#016464] aso-text-md aso-p-2 aso-px-4 aso-rounded-full aso-cursor-pointer">
                                    <input @click="addImageToSign()" class="aso-hidden" id="aso-iamge-input" type="file" name="aso-pickImages" accept="image/png, image/gif, image/jpeg" />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-6 aso-h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                    </svg>
                                    <p>Add new image</p>
                                </label>
                            </div>

                            <div v-show="!editImage" class="aso-p-2">
                                <div v-if="usedImages.length > 0" class="aso-space-y-1">
                                    <p class="aso-font-medium">Currently in use</p>
                                    <div class="aso-flex aso-flex-wrap aso-gap-2 aso-p-1">
                                        <div v-for="(usedImage, index) in usedImages">
                                            <div @click="editAddedImage(usedImage.object)" class="aso-flex aso-flex-col aso-space-y-2 aso-full-center aso-p-1 aso-border aso-cursor-pointer">
                                                <img :src="usedImage.url" alt="" class="aso-w-20 aso-h-20">
                                                <p class="aso-text-xs aso-font-medium">Edit image</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="configImageSettingsClipart.active" class="aso-space-y-3">
                                    <p class="aso-font-medium">Cliparts</p>
                                    <div class="aso-flex aso-flex-col aso-space-y-2">
                                        <div v-for="(clipart, index) in allClipart">
                                            <div @click="showClipartImages(clipart.cliparts, index)" class="aso-w-full aso-flex aso-flex-col aso-space-y-3 aso-justify-start aso-border aso-border-solid aso-p-3 aso-rounded-lg aso-cursor-pointer">
                                                <p class="aso-text-base aso-font-semibold">{{clipart.title}}</p>
                                                <p class="aso-text-xs">{{clipart.description}}</p>
                                            </div>
                                            <div v-if="showClipart && clipartId == index">
                                                <div class="aso-flex aso-flex-wrap aso-gap-2 aso-p-1">
                                                    <div v-for="(image, id) in currentClipart">
                                                        <div @click="addImageToSign(image.url)" class="aso-flex aso-flex-col aso-space-y-2 aso-full-center aso-p-1 aso-border aso-cursor-pointer">
                                                            <img :src="image.url" alt="" class="aso-w-20 aso-h-20 aso-border aso-border-solid aso-p-1">
                                                            <p class="aso-text-sm aso-font-medium">{{image.title}}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div v-show="editImage" class="aso-w-full aso-p-2">
                                <div>
                                    <p class="aso-font-medium">Size</p>
                                    <div class="aso-w-full aso-p-2 aso-space-y-1">
                                        <label class="aso-text-xs" for="aso-image-sizeWidth">width</label>
                                        <input type="range" name="aso-imageSize" id="aso-image-sizeWidth" class="aso-w-full" :min="0.1" :max="1.4" :step="0.05" :value="0.4" @change="changeImageWidth">
                                        <label class="aso-text-xs" for="aso-image-sizeHeight">height</label>
                                        <input type="range" name="aso-imageSize" id="aso-image-sizeHeight" class="aso-w-full" :min="0.1" :max="1.4" :step="0.05" :value="0.4" @change="changeImageHeight">
                                        <p class="aso-flex aso-full-center aso-font-medium"> <span id="image-width"></span> x <span id="image-height"></span> </p>
                                    </div>
                                </div>
                                <!-- <div>
                                    <p class="aso-font-medium">Border</p>
                                    <div class="aso-w-full aso-grid aso-grid-cols-3 aso-gap-3">
                                        <div v-for="(border, index) in borders" :key="border.name" class="aso-w-full aso-flex">
                                            <input type="radio" :id="border.name + index" name="aso-borders" class="peer aso-hidden" @change="selectImageBorder(border.name)">
                                            <label :for="border.name + index" :class="`${activeBorder == border.name ? `aso-text-[#016464]` : `aso-text-zinc-800 aso-border-zinc-800`} 
                                                aso-w-full aso-h-full aso-flex aso-flex-col aso-full-center aso-font-semibold aso-text-sm hover:aso-text-[#016464] aso-rounded-md aso-p-2 aso-text-center aso-cursor-pointer aso-transition-all aso-ease-in-out aso-duration-500`"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-10 aso-h-10">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z" />
                                                </svg>
                                                <p>{{border.name}}</p>
                                            </label>
                                        </div>
                                    </div>
                                </div> -->
                                <div class="aso-space-y-4">
                                    <p class="aso-font-medium">Other custom</p>
                                    <div class="aso-w-full aso-flex aso-items-center">
                                        <div class="aso-flex aso-space-x-6">
                                            <span @click="turnLeftImage()" class="aso-flex aso-flex-col aso-full-center aso-space-y-4 hover:aso-text-[#016464] aso-base-animation">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-5 aso-h-5">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                                                </svg>
                                                <p class="aso-text-xs aso-font-semibold">Turn left</p>
                                            </span>

                                            <span @click="turnRightImage()" class="aso-flex aso-flex-col aso-full-center aso-space-y-4 hover:aso-text-[#016464] aso-base-animation">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="aso-w-5 aso-h-5">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3" />
                                                </svg>
                                                <p class="aso-text-xs aso-font-semibold">Turn right</p>
                                            </span>

                                            <span @click="flipImage()" :class="`aso-flex aso-flex-col aso-full-center aso-space-y-4 hover:aso-text-[#016464] aso-base-animation`">
                                                <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="aso-w-5 aso-h-5">
                                                    <path d="m10.562 13.984c-3.1094-0.2241-5.5625-2.8177-5.5625-5.9843 0-3.3137 2.6863-6 6-6h7c0.5523 0 1 0.44771 1 1v18c0 0.5523-0.4477 1-1 1s-1-0.4477-1-1v-7h-4.4444l-3.3144 7.4573c-0.14667 0.33-0.47392 0.5427-0.83505 0.5427-0.66129 0-1.1036-0.6807-0.83505-1.2849l2.9914-6.7308zm0.4375-1.9843c-2.2091 0-4-1.7909-4-4 0-2.2091 1.7909-4 4-4h6v8h-6z" clip-rule="evenodd" fill="currentColor" fill-rule="evenodd"></path>
                                                </svg>
                                                <p class="aso-text-xs aso-font-semibold">Flip</p>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <!-- <div class="flex space-x-6">
                                    <div class="space-y-2">
                                        <p class="aso-font-medium">Position</p>
                                        <div>
                                            width: <span id="text-width"></span> - height: <span id="text-height"></span>
                                        </div>
                                        <div>
                                            left: <span id="text-left"></span> - right: <span id="text-right"></span>
                                        </div>
                                        <div>
                                            top: <span id="text-top"></span> - bottom: <span id="text-bottom"></span>
                                        </div>
                                    </div>
                                </div> -->
                            </div>
                        </div>
                    </div>
                </div>

                <div class="aso-w-full aso-flex lg:aso-hidden aso-h-[6%] aso-bg-red-400">
                    <div class="aso-w-1/2 aso-h-full aso-flex aso-full-center aso-bg-zinc-200">Cancel</div>
                    <div class="aso-w-1/2 aso-h-full aso-flex aso-full-center aso-bg-[#016464] aso-text-white hover:aso-bg-[#029797]">{{props.config.data.settings.languageImages.visualizer.textButtonFinish}}</div>
                </div>
            </div>
        </div>

        <div class="aso-absolute aso-top-[50%] lg:aso-top-0 aso-translate-y-[-70%] lg:aso-translate-y-0 aso-right-4 lg:aso-right-0 lg:aso-relative aso-w-[8%] aso-h-fit lg:aso-h-full aso-p-2 lg:aso-p-0 aso-flex aso-flex-col aso-rounded-lg lg:aso-rounded-none aso-shadow-lg aso-bg-white">
            <div v-if="isLoaded" class="aso-w-full aso-h-full aso-flex aso-flex-col">
                <div class="aso-w-full aso-bg-gradient-to-r aso-from-zinc-400 aso-via-zinc-200 aso-to-zinc-400 aso-p-4 aso-h-[10%] aso-animate-pulse"></div>

                <div class="aso-h-[90%] aso-flex aso-full-center aso-flex-col aso-space-y-4 aso-animate-pulse">
                    <div class="aso-w-[80%] aso-bg-gradient-to-r aso-from-zinc-400 aso-via-zinc-200 aso-to-zinc-400 aso-p-4 aso-h-[11%]"></div>
                    <div class="aso-w-[80%] aso-bg-gradient-to-r aso-from-zinc-400 aso-via-zinc-200 aso-to-zinc-400 aso-p-4 aso-h-[11%]"></div>
                    <div class="aso-w-[80%] aso-bg-gradient-to-r aso-from-zinc-400 aso-via-zinc-200 aso-to-zinc-400 aso-p-4 aso-h-[11%]"></div>
                    <div class="aso-w-[80%] aso-bg-gradient-to-r aso-from-zinc-400 aso-via-zinc-200 aso-to-zinc-400 aso-p-4 aso-h-[11%]"></div>
                    <div class="aso-w-[80%] aso-bg-gradient-to-r aso-from-zinc-400 aso-via-zinc-200 aso-to-zinc-400 aso-p-4 aso-h-[11%]"></div>
                </div>
            </div>


            <button v-show="!isLoaded" @click="finishConfig" class="aso-hidden lg:aso-flex aso-full-center aso-w-full aso-h-[10%] aso-bg-[#FFBC3C] aso-text-white aso-font-semibold aso-p-2 aso-px-3 aso-base-animation">{{props.config.data.settings.languageImages.visualizer.textButtonFinish}}</button>

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
            </div>       
        </div>

    </div>
</template>

<script setup>
    import { ref, onMounted, defineProps } from 'vue';
    // import {handleGetCanvas, handleGetCurrentUnit, handleUndo,
    //     handleRedo,
    //     handleClearAll,
    //     handleGetObjectByName,
    //     handleChangeSize,
    //     handleDeleteObject,
    //     handleCloneObject,
    //     handleCenterVertically,
    //     handleCenterHorizontally,
    //     handleSelectBorder,
    //     handleChangeSignColor,
    //     handleGetShape,
    //     handleSelectShape,
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
    //     handleGetAddedImageValues,
    //     handleAddImageToSign,
    //     handleTurnImageLeft,
    //     handleTurnRightImage,
    //     handleChangeImageWidth,
    //     handleChangeImageHeight,
    //     handleFlipImage,
    //     handleCheckActiveSignFace,
    //     handleCloneCanvas,
    //     handleSetImageToSignBackground,
    //     finishConfiguration,
    // } from '@/frontend/utils/aso-editor-script.js'

    const props = defineProps({
        config:Object,
        manage:Object,
    });

    console.log(props.config)

    var configSettings = ref({})
    var configDoublePart = ref({})
    var configTextSettings = ref({})
    var configTextFontSettings = ref({})
    var configImageSettings = ref({})
    var configImageSettingsClipart = ref({})


    var isLoaded = ref(true)
    function setIsLoadedToFalse() {
        setTimeout(() => {
            isLoaded.value = false;
        }, 1000);
    };

    var div = document.getElementById('canvas-container')


    var showOption = ref(false);
    var step = ref('text');
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
    function showOptions(option, stepValue){
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
                if(borderrs.value.length > 0){
                    step.value = option;
                    showOption.value = true;
                }
            break;

            case "color":
                if(colorrs.value.length > 0){
                    step.value = option;
                    showOption.value = true;
                }
            break;

            case "text":
                if(currentMaterialTextImages.value.enableText){
                    step.value = option;
                    showOption.value = true;
                }
            break;

            case "image":
                if(currentMaterialTextImages.value.enableImage){
                    step.value = option;
                    showOption.value = true;
                }
            break;

            case "component":
                if(stepValue && materialType.value == 'advance'){
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

    var showFont = ref(false)
    function dropFontToggle(){
        showFont.value = !showFont.value;
    }

    var showSize = ref(false)
    function dropSizeToggle(){
        console.log('drop')
        showSize.value = !showSize.value;
    }

    var pickedColor = ref("aa")
    var simpleColor = ref("#000000");

    var fabric = window.fabric;

    var canvasFace1Ref = ref(null);
    var canvasFace2Ref = ref(null);
    var canvas = null
    var canvasBack = null
    var activeCanvas = canvas

    var defaultShadow = ref(new fabric.Shadow({
        color: 'black',
        offsetX: 3,
        offsetY: 3,
        blur: 30,
        isActive: true
    }))

    function getCanvas(canvas1, canvas2){
        handleGetCanvas(canvas1, canvas2)
    }

    onMounted(() => {
        configSettings.value = props.config.data.settings
        configDoublePart.value = props.config.data.settings.customizerSign.signPart.doublePart

        allSizes.value = props.manage.manageSize
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
        
        console.log(props.manage)
        console.log(configImageSettings.value)

        handleGetCurrentUnit(configSettings.value.customizerSign.customizerOptions.measurementUnit, configTextFontSettings.value.defaultFontSize)    


        
        selectMaterial(props.config.data.materials[0])


        var optionss = document.querySelector('#aso-options-container')
        document.addEventListener('click', handleDocumentClick)
        console.log(fabric.version)

        const canvasElementFace1 = canvasFace1Ref.value
        const canvasElementFace2 = canvasFace2Ref.value

        document.addEventListener("DOMContentLoaded", function() {

            var canvasContainer = document.getElementById("aso-canvas-containers")
            var canvasWidth = canvasContainer.clientWidth;
            var canvasHeight = canvasContainer.clientHeight;

            canvas = new fabric.Canvas(canvasElementFace1,{
                backgroundColor : "#f5f5f5",
                width: canvasWidth, 
                height: canvasHeight, 
                // selectable: true,
                // hasControls: true,
                interactive: true,
                name: 'front-face'
            });
            canvasBack = new fabric.Canvas(canvasElementFace2,{
                backgroundColor : "#f5f5f5",
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


            var hLine = new fabric.Line([(rectangle.left + rectangle.width +20), rectangle.top, (rectangle.left + rectangle.width +20), (rectangle.top + rectangle.height)], {
                stroke: 'black',
                strokeWidth: 2,
                selectable: false,
                name: 'heightLine',
                id: 1, 
            });
            var hValue = new fabric.IText(String(rectHeight),{
                left: (rectangle.left + rectangle.width +10),
                top: rectangle.top + (rectangle.height/2),
                fontSize: 15,
                fill: 'black',
                name: 'height-value',
                id: 2,
                selectable: false,
            })
            var wLine = new fabric.Line([rectangle.left, (rectangle.top+rectangle.height+20), (rectangle.left+rectangle.width+20), (rectangle.top+rectangle.height+20) ], {
                stroke: 'black',
                strokeWidth: 2,
                selectable: false,
                name: 'widthLine',
                id: 3, 
            });
            var wValue = new fabric.IText(String(rectWidth),{
                left: rectangle.left + (rectangle.width/2),
                top: rectangle.top + (rectangle.height +10),
                fontSize: 15,
                fill: 'black',
                name: 'width-value',
                id: 4,
                selectable: false,
            })


            // canvas.clipPath = cnvasClip
            canvas.add(rectangle, hLine, hValue, wLine, wValue);
            canvasBack.add(rectangle2);
        
            getCanvas(canvas, canvasBack)
        
            checkScreenSize();
            canvas.selection = false;
            canvasBack.selection = false;
    
            // hLine.bringToFront()
            // wLine.bringToFront()
    
    
            // selectedShape.value = shapes.value[0].name
            // handleGetShape(shapes.value[0].name)
            var stopShape = false
            if(shapees.value.length >0){
                shapees.value.forEach((shapee, id) => {
                    allShapes.value.forEach((shape, index) => {
                        if(shapee.shapeId == index && !stopShape){
                            selectedShape.value = shape.value
                            handleGetShape(shape.value)
                            stopShape = true
                        }
                    })
                })
            }else{
                selectedShape.value = 'square'
                handleGetShape('square')
            }
    
            var stopSize = false
            if(sizees.value.length >0){
                sizees.value.forEach((sizee, id) => {
                    allSizes.value.forEach((size, index) => {
                        if(sizee.manageSizeId == index && !stopSize){
                            changeSize(size, sizee)
                            stopSize = true
                        }
                    })
                })
            }else{
                var size ={
                    width: 0,
                    height: 0
                }
                changeSize(size)
            }

            var stopFixing = false
            fixinggs.value.forEach((fixingg, id) => {
                allFixings.value.forEach((fixing, index) => {
                    if(fixingg.fixingMethodId == index && !stopFixing){
                        selectFixingMethode(fixing.type)
                        stopFixing = true
                    }
                })
            })

            var stopBorder = false
            borderrs.value.forEach((borderr, id) => {
                allBorders.value.forEach((border, index) => {
                    if(borderr.manageBorderId == index && !borderr.excludeSizes.includes(currentSizeId) && !stopBorder){
                        selectBorder(border.value, borderr.settings.codeHex)
                        stopBorder = true
                    }
                })
            })

            var stopColor = false
            colorrs.value.forEach((colorr, id) => {
                allColors.value.forEach((color, index) => {
                    if(colorr.manageColorId == index && !stopColor){
                        changeSignColor(color)
                        stopColor = true
                    }
                })
            })


    
            //custom des boutons pour les objets ajouter au sign
            fabric.Object.prototype.transparentCorners = false;
            fabric.Object.prototype.cornerColor = 'black';
            fabric.Object.prototype.borderColor = 'black';
            fabric.Object.prototype.cornerStyle = 'circle';
            
            canvas.on('object:moving', updateInfoDiv,);
            canvas.on('object:scaling', updateInfoDiv);
            canvas.on('object:rotating', updateInfoDiv);
            canvas.on('selection:created', updateInfoDiv);
            canvas.on('selection:cleared', closeInfoDiv);
            canvas.on('selection:created', showObjectValues);
            canvas.on('selection:cleared', closeObjectValues);

            canvasBack.on('object:moving', updateInfoDiv,);
            canvasBack.on('object:scaling', updateInfoDiv);
            canvasBack.on('object:rotating', updateInfoDiv);
            canvasBack.on('selection:created', updateInfoDiv);
            canvasBack.on('selection:cleared', closeInfoDiv);
            canvasBack.on('selection:created', showObjectValues);
            canvasBack.on('selection:cleared', closeObjectValues);
            
            handleCloneCanvas(canvas, canvasBack)
            activeCanvas = canvas

            window.addEventListener('resize', checkScreenSize);
    
            // updateBarreSize()
        });

        if(window.innerWidth < 688){
            showOption.value = true
        }

        // selectMaterial(props.config.data.materials[0])

        setIsLoadedToFalse()

        return {
            canvas
        }

    });


    function undo() {
        var options = handleUndo()
        currentSizeName.value = options.sizeName
        selectedShape.value = options.shape
        activeBorder.value = options.border
        activeFixingMethode.value = options.fixing
        activeSignColor.value = options.signColor
        console.log(options)
        
    }
    function redo() {
        var options = handleRedo()
        currentSizeName.value = options.sizeName
        selectedShape.value = options.shape
        activeBorder.value = options.border
        activeFixingMethode.value = options.fixing
        activeSignColor.value = options.signColor
        console.log(options)
    }
    function clearAll() {
        handleClearAll()
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

        // console.log(window.innerWidth, window.innerHeight)
        // console.log("canvas-container", canvasWidth, canvasHeight)

        let windowRatio = canvasWidth / canvasHeight;
        let targetRatio = 16/9;

        let scaleRatio;
        if (windowRatio > targetRatio) {
            scaleRatio = canvasHeight / (canvasWidth / targetRatio);
            var hValue = handleGetObjectByName('height-value')
            var wValue = handleGetObjectByName('width-value')
            var fontSize = (hValue.fontSize / targetRatio) + 10
            hValue.fontSize = fontSize
            wValue.fontSize = fontSize
            // console.log("==1==", scaleRatio, "==1==")
        } else {
            scaleRatio = canvasWidth / (canvasHeight * targetRatio) - 0.15;
            var hValue = handleGetObjectByName('height-value')
            var wValue = handleGetObjectByName('width-value')
            var fontSize = (hValue.fontSize * targetRatio) + 10
            hValue.fontSize = fontSize
            wValue.fontSize = fontSize
            // console.log("==2==", scaleRatio, "==2==")
        }

        canvas.zoomToPoint({x: canvas.width/2, y: canvas.height/2}, scaleRatio)
        canvasBack.zoomToPoint({x: canvas.width/2, y: canvas.height/2}, scaleRatio)

        // canvas.getObjects().forEach(obj => {
        //     obj.scaleX *= scaleRatio;
        //     obj.scaleY *= scaleRatio;
        //     obj.setCoords();
        // });
        
        canvas.setWidth(canvasWidth);
        canvas.setHeight(canvasHeight);

        canvasBack.setWidth(canvasWidth);
        canvasBack.setHeight(canvasHeight);
    }
    function updateInfoDiv() {
        var infoDiv = document.getElementById('aso-editButtons');
        
        
        var canvasRect = activeCanvas.getElement().getBoundingClientRect();
        var object = activeCanvas.getActiveObject();
        var objectRect = object.getBoundingRect();
        
        if(object != null){
            infoDiv.classList.remove("aso-invisible");
            // Calculez la position de la div en fonction de l'objet du canvas
            var divLeft = canvasRect.left + objectRect.left + objectRect.width / 2;
            var divTop = canvasRect.top + objectRect.top + objectRect.height / 2;
    
            // Mettez à jour la position de la div
            infoDiv.style.left = divLeft + 'px';
            infoDiv.style.top = divTop + 'px';
        }
    }
    function closeInfoDiv(){
        var infoDiv = document.getElementById('aso-editButtons');
        infoDiv.classList.add("aso-invisible");
    }

    var angleActive = ref(false)
    function showObjectValues(){
        var div = document.getElementById('activeObject-values');
        var object = activeCanvas.getActiveObject();
        if(object.type == 'image'){
            angleActive.value = true
        }
        div.classList.remove("aso-invisible");
    }
    function closeObjectValues(){
        var div = document.getElementById('activeObject-values');
        div.classList.add("aso-invisible");
    }


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
        console.log("selectMaterial", material)
        selectedMaterial.value = material.name

        if(material.type == 'simple'){
            if(material.data.sizes.allSizes){
                sizees.value = material.data.sizes.allSizes
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

            if(firstLoad.value){
                var stopShape = false
                if(shapes.value.length >0){
                    shapees.value.forEach((shapee, id) => {
                        allShapes.value.forEach((shape, index) => {
                            if(shapee.shapeId == index && !stopShape){
                                selectedShape.value = shape.value
                                handleGetShape(shape.value)
                                stopShape = true
                            }
                        })
                    })
                }else{
                    selectedShape.value = 'square'
                    handleGetShape('square')
                }

                var stopSize = false
                if(sizees.value.length >0){
                    sizees.value.forEach((sizee, id) => {
                        allSizes.value.forEach((size, index) => {
                            if(sizee.manageSizeId == index && !stopSize){
                                changeSize(size, sizee)
                                stopSize = true
                            }
                        })
                    })
                }else{
                    var size ={
                        width: 0,
                        height: 0
                    }
                    changeSize(size)
                }

                var stopFixing = false
                fixinggs.value.forEach((fixingg, id) => {
                    allFixings.value.forEach((fixing, index) => {
                        if(fixingg.fixingMethodId == index && !stopFixing){
                            selectFixingMethode(fixing.type)
                            stopFixing = true
                        }
                    })
                })

                var stopBorder = false
                borderrs.value.forEach((borderr, id) => {
                    allBorders.value.forEach((border, index) => {
                        if(borderr.manageBorderId == index && !borderr.excludeSizes.includes(currentSizeId) && !stopBorder){
                            selectBorder(border.value, borderr.settings.codeHex)
                            stopBorder = true
                        }
                    })
                })

                var stopColor = false
                colorrs.value.forEach((colorr, id) => {
                    allColors.value.forEach((color, index) => {
                        if(colorr.manageColorId == index && !stopColor){
                            changeSignColor(color)
                            stopColor = true
                        }
                    })
                })
            }
        }

        var stop = false
        var stopOption = false
        if(material.type == 'advance'){
            currentMaterial.value.data.forEach(component => {
                if(!stop){
                    showOptions('component', component)
                    stop = true
                }
            })
            advancedComponent.value.options.forEach( option => {
                if(!stopOption){
                    selectSignModel(option)
                    stopOption = true
                }
            })
        }

        firstLoad.value = true
    }

    var activeSignModelName = ref('')
    function selectSignModel(model){
        activeSignModelName.value = model.name
        // selection du shape 
        allShapes.value.forEach((shape, index) => {
            if(model.shapeId == index ){
                selectedShape.value = shape.value
                handleGetShape(shape.value)
            }
        })
        var modelSize = {
            name: model.name,
            width: model.size.width,
            height: model.size.height
        }
        // selection de la size
        changeSize(modelSize)
        // console.log(modelSize)

        //selection de la couleur
        setImageToSignBackground(model.image, model.color.name)


        // selection de fixing
        var stopFixing = false
        fixinggs.value = model.fixingMethods
        fixinggs.value.forEach(fixingId => {
            allFixings.value.forEach((fixing, index) => {
                if(fixingId == index && !stopFixing){
                    selectFixingMethode(fixing.type)
                    stopFixing = true
                }
            });
        });
        colorrs.value = [{color: model.color, image: model.image}]

    }


    function setImageToSignBackground(image, coolrName){
        handleSetImageToSignBackground(image);
    }



    var sizes = ref([
        {
            "name" : 'xLarge',
            "width" : 600,
            "height" : 400
        },
        {
            "name" : 'small',
            "width" : 400,
            "height" : 400
        },
        {
            "name" : 'xs',
            "width" : 8,
            "height" : 20
        },
        {
            "name" : 'lil',
            "width" : 25,
            "height" : 10
        },
        {
            "name" : 'large',
            "width" : 700,
            "height" : 400
        },
        {
            "name" : 'XLarge',
            "width" : 650,
            "height" : 600
        },
        {
            "name" : '2XLarge',
            "width" : 1050,
            "height" : 800
        },
    ])
    var customSizeValues = ref({
        label: props.config.data.settings.languageImages.visualizer.customSize,
        width: 0,
        height: 0
    })

    var shapes = ref([
        {
            'name' : 'square'
        },
        {
            'name' : 'oval'
        },
        {
            'name' : 'triangle'
        },
        {
            'name' : 'rounded-square'
        },
        {
            'name' : 'rotated-square'
        },
        {
            'name' : 'turn-left'
        },
        {
            'name' : 'turn-right'
        },
        {
            'name' : 'arrow-left'
        },
        {
            'name' : 'arrow-right'
        },
        {
            'name' : 'stop'
        },
        {
            'name' : 'rounded-top'
        },
        {
            'name' : 'rounded-sides'
        },
    ])
    var colors = ref([
        {
            'name' : 'pink',
            'code' : '#ff0084'
        },
        {
            'name' : 'green',
            'code' : '#016464'
        },
        {
            'name' : 'orange',
            'code' : '#fcb603'
        },
        {
            'name' : 'brown',
            'code' : '#8a1e00'
        },
        {
            'name' : 'cyan',
            'code' : '#51d0fb'
        },
        {
            'name' : 'black',
            'code' : '#000'
        },
        {
            'name' : 'purple',
            'code' : '#a600ff'
        },
        {
            'name' : 'gold',
            'code' : '#dba11a'
        },
        {
            'name' : 'silver',
            'code' : '#8b877e'
        },
    ])
    var fonts = ref([
        {
            'name' : 'Allura',
            'code' : 'pink'
        },
        {
            'name' : 'Avante',
            'code' : 'brown'
        },
        {
            'name' : 'Serif',
            'code' : 'cyan'
        },
    ])
    var borders = ref([
        {
            'name': 'none'
        },
        {
            'name': 'normal'
        },
        {
            'name': 'old-wold'
        },
    ])
    var fixings = ref([
        {
            'name': 'none',
            'type': 'none',
        },
        {
            'name': 'screw',
            'type': 'screw',
        },
        {
            'name': 'screw-cap',
            'type': 'screw-cap',
        },
        {
            'name': 'standoff',
            'type': 'standoff',
        },
        {
            'name': 'hanging',
            'type': 'hanging',
        },
        {
            'name': 'flag',
            'type': 'flag',
        },
        {
            'name': 'suction-cup',
            'type': 'suction-cup',
        },
        {
            'name': 'table-stand',
            'type': 'table-stand',
        },
        {
            'name': 'ceiling',
            'type': 'ceiling',
        },
        {
            'name': 'pole-attachement',
            'type': 'pole-attachement',
        },
        {
            'name': 'cable-labeling',
            'type': 'cable-labeling',
        },
        {
            'name': 'table-clamp',
            'type': 'table-clamp',
        },
        {
            'name': 'base-support',
            'type': 'base-support',
        },
    ])


    var sizeRatio = ref('big')
    var fixScale = ref(0)
    var signRatio = ref(0)
    var ratioScale = ref(0)



    function deleteObject(){
        var object = activeCanvas.getActiveObject();
        // addedTexts.value = handleDeleteObject(object)
        if(object.type == 'i-text'){
            addedTexts.value = handleDeleteObject(object)
            selectText.value = false
            console.log(addedTexts.value)
        }
        if(object.type == 'image'){
            usedImages.value = handleDeleteObject(object)
            // selectText.value = false
        }
    }
    function cloneObject(){
        var object = activeCanvas.getActiveObject();
        handleCloneObject(object)
    }
    function centerHorizontally(){
        var object = activeCanvas.getActiveObject();
        handleCenterHorizontally(object)
    }
    function centerVertically(){
        var object = activeCanvas.getActiveObject();
        handleCenterVertically(object)
    }




    var sizees = ref([])
    var customSizes = ref()
    var allSizes = ref()
    var currentSizeName = ref('')
    var currentSize = ref('')
    var currentSizeId = ref(0)
    var currentSizeValues = ref()
    var currentSizeThickness = ref(false)
    function changeSize(sizeData, sizeSetting, sizeId) {
        if(sizeId){
            // console.log(sizeId, 'size id')
            currentSizeId.value = sizeId
        }
        if(sizeSetting){
            textNumberForSize.value = sizeSetting.textNumber
            currentSizeValues.value = handleChangeSize(sizeData.width, sizeData.height, sizeData.name, sizeSetting.textNumber)
        }else{
            currentSizeValues.value = handleChangeSize(sizeData.width, sizeData.height, sizeData.name, null)
        }

        currentSizeName.value = sizeData.label;
        if(sizeData.thickness){
            if(sizeData.thickness.active == true){
                currentSize.value = {width: sizeData.width, height: sizeData.height, thickness: sizeData.thickness.value};
                currentSizeThickness.value = sizeData.thickness.active
            }else{
                currentSizeThickness.value = sizeData.thickness.active
                currentSize.value = {width: sizeData.width, height: sizeData.height};
            }
        }

        addedTexts.value = currentSizeValues.value.texts
    }

    var allShapes = ref({})
    var shapees = ref([])
    var selectedShape = ref('square')
    function selectShape(shape, nwidth, nheight, nTop, nLeft){
        handleSelectShape(shape, nwidth, nheight, nTop, nLeft)
        selectedShape.value = shape
    }

    var allBorders = ref({})
    var borderrs = ref([])
    var activeBorder = ref('')
    function selectBorder(border, color) {
        activeBorder.value = handleSelectBorder(border, color)
    }

    var allColors = ref({})
    var colorrs = ref([])
    var activeSignColor = ref('')
    var signTextColor = ref(false)
    function changeSignColor(color, setting) {
        signTextColor.value = color.textColor.active
        activeSignColor.value = color.name
        handleChangeSignColor(color)
    }

    var allFixings = ref({})
    var fixinggs = ref([])
    var activeFixingMethode = ref('')
    function selectFixingMethode(methode){
        activeFixingMethode.value = methode
        handleSelectFixingMethode(methode)
    }




    var textNumberForSize = ref(0)
    var addedTexts = ref([])
    function addTextToSign(){
        addedTexts.value =  handleAddTextToSign()
        if(addedTexts.value.length > 0){
            var index = addedTexts.value.length - 1
            getTextObject(addedTexts.value[index])
        }
        // console.log(addedTexts.value)
    }
    function getTextObject(object) {
        if(activeFace.value == object.canvas.name){
            selectText.value = true
            object.selected = true;
    
            selectedText.value.value = object.text
    
            activeCanvas.setActiveObject(object);
            handleGetAddedTextValues(object)
            activeCanvas.requestRenderAll();
        }
    }
    function changeText(){
        selectText.value = false
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
    var usedImages = ref({})
    function addImageToSign(image){
        if(image){
            usedImages.value = handleAddImageToSign(image)
            editImage.value = true
        }else{
            usedImages.value = handleAddImageToSign()
        }
        console.log("lockToCanvas", usedImages.value)

    }
    function editAddedImage(image){
        editImage.value = true
        canvas.setActiveObject(image);
        handleGetAddedImageValues(image)
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




    var editAction = ref(false)
    var selectedText = ref({
        object: {},
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
    })
    var selectedImage = ref({
        object: {},
        width: '',
        height: '',
        left: '',
        right: '',
        top: '',
        bottom: '',
        angle: 0,
    })

    function editText(eventData, transform){
        editAction.value = true
        var target = transform.target;
		var canvas = target.canvas;
    }

    function changeTextValue(){
        handleChangeTextValue()
    }
    function changeTextWeight(){
        var weight = handleChangeTextWeight()
        selectedText.weight = weight
    }
    function changeTextAlign(align){
        selectedText.align = handleChangeTextAlign(align)
    }
    function changeTextStyle(){
        handleChangeTextStyle()
    }
    function changeTextSize(min, max){
        handleChangeTextSize(min, max)
    }
    var fontFamSelected = ref("Arial")
    var allFonts = ref([])
    function changeTextFontFam(font){
        fontFamSelected.value = font
        handleChangeTextFontFam(font)
    }
    function changeTextColor(color){
        handleChangeTextColor(color)
    }
    function underlineText(){
        handleUnderlineText()
    }
    function crossText(){
        handleCrossText()
    }
    function overlineText(){
        handleOverlineText()
    }


    function changeTextBackground(textObject){

    }

    function turnLeftImage(){
        handleTurnImageLeft()
    }
    function turnRightImage(){
        handleTurnRightImage()
    }
    function flipImage(){
        handleFlipImage()
    }

    function finishConfig(){
        var SignObject = handleGetObjectByName('safeObject', canvas)
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
        console.log(finishConfiguration(textObjects, imageObjects))
        // console.log(imageObjects,"added unique object")
    }


</script>

<style scoped>
    #canvaas {
        /* border: 3px solid green */
    }

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
        background-color: #bbb;
        color: black;
    }

    #aso-sign-verso {
        background-color: dodgerblue;
        color: white;
        transform: rotateY(180deg);
    }
</style>
