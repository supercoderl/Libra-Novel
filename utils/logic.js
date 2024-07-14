export const checkIsGuest = (session) => {
    if (session?.user) {
        if (!session?.user?.roles?.includes(100) && !session?.user?.roles?.includes(200)) {
            return true;
        }
        return null;
    }
    return null;
}