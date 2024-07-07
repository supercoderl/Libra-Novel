
//Check if permission exists to access or not
export const checkPermission = (requiredPermissions: string[], userPermissions: { [key: number]: string }): boolean => {
    return requiredPermissions.every(permission => Object.values(userPermissions).includes(permission));
};