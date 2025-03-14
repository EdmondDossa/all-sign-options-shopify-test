import prisma from "~/db.server";

export default class SessionService{
    
    static async get(sessionId: string): Promise<any | null> {
        try {
            return await prisma.session.findUnique({
                where: {
                    id: sessionId
                }
            });
        } catch (error) {
            console.error("Error retrieving session:", error);
            return Promise.resolve(null);
        }
    }

    static  async  init(sessionId: string): Promise<any | null> {
        try {
            return await prisma.session.update({
                where: {
                    id: sessionId
                },
                data: {
                    isInitialized: true
                }
            });
        } catch (error) {
            console.error("Error creating session:", error);
            return Promise.resolve(null);
        }
    }


}