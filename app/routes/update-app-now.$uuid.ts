import { LoaderFunctionArgs, json } from "@remix-run/node";
import prisma from "~/db.server";
import TemplateService from "~/models/Template.service";
import SettingService from "~/models/Setting.service";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
    const uuid = "7deaa757-6c68-4baf-8ce9-4ccfacd68972";

    if (uuid == params.uuid) {
        try {
            // Get all sessions
            const sessions = await prisma.session.findMany({
                select: {
                    id: true,
                    shop: true
                }
            });

            console.log(`Found ${sessions.length} sessions to update`);

            // Update each session's settings to include Cut to Shape
            for (const session of sessions) {
                console.log(`Processing session for shop: ${session.shop}`);
                const setting = await SettingService.getSetting(session.id);
                
                if (setting && setting.data) {
                    console.log('Current shapes:', setting.data.shapes);
                    
                    // Check if shapes array exists and doesn't already have Cut to Shape
                    const hasCutToShape = setting.data.shapes?.some((shape: any) => shape.value === "cut-to-shape");
                    console.log('Has Cut to Shape:', hasCutToShape);
                    
                    if (!hasCutToShape) {
                        const url = session.shop ? `https://${session.shop}/apps/aso-proxy` : "";
                        
                        // Add Cut to Shape to the shapes array
                        const updatedShapes = [
                            ...(setting.data.shapes || []),
                            {
                                name: "Cut To Shape",
                                icon: url + "/assets/images/shapes/ic_shape_cut_to_shape.svg",
                                value: "cut-to-shape"
                            }
                        ];

                        console.log('Updated shapes array:', updatedShapes);

                        // Update the setting with the new data object
                        await prisma.setting.update({
                            where: { id: setting.id },
                            data: {
                                data: {
                                    ...setting.data,
                                    shapes: updatedShapes
                                }
                            }
                        });
                        console.log(`Updated settings for shop: ${session.shop}`);
                    }
                } else {
                    console.log(`No settings found for shop: ${session.shop}`);
                }
            }

            return json({ msg: "Update completed successfully" });
        } catch (error) {
            console.error("Error updating stores:", error);
            return json({ error: "Failed to update stores" }, { status: 500 });
        }
    }
    
    return json({ error: "Invalid UUID" }, { status: 403 });
}