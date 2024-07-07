"use client"

import React, { useState, createContext, useEffect, useContext } from "react";
import useAxios from "../hooks/useAxios";
import { NavItem, Permission } from "@/types/index";
import { useSession } from "next-auth/react";

interface ProviderProps {
    children: React.ReactNode;
}

interface MenuContextType {
    menus: NavItem[];
    loading: boolean;
    update: () => void;
}

interface PermissionContextType {
    permissions: { [key: number]: string };
    loading: boolean;
    update: () => void;
}

const MenuContext = createContext<MenuContextType>({
    menus: [],
    loading: false,
    update: () => { }
});

const PermissionsContext = createContext<PermissionContextType>({
    permissions: {},
    loading: false,
    update: () => { }
});

const MenuProvider: React.FC<ProviderProps> = ({ children }) => {
    const [menus, setMenus] = useState<NavItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [trigger, setTrigger] = useState(0);
    const { data: session } = useSession();
    const axios = useAxios();

    //Load menu list
    const loadMenu = async () => {
        const menus = window.localStorage.getItem("menus");
        if (menus) {
            setMenus(JSON.parse(menus));
            setLoading(false);
            return;
        }
        await axios.get("/get-menus-by-role").then(({ data }) => {
            if (data && data.succeeded) {
                setMenus(data.data);
                window.localStorage.setItem("menus", JSON.stringify(data.data));
            }
        }).finally(() => setTimeout(() => setLoading(false), 300));
    };

    //Reload menu when trigger called
    const update = () => {
        window.localStorage.removeItem("menus");
        setTrigger(prev => prev + 1);
    };

    useEffect(() => {
        loadMenu();
    }, [trigger, session]);

    return (
        <MenuContext.Provider value={{ menus, loading, update }}>
            {children}
        </MenuContext.Provider>
    )
};

const PermissionProvider: React.FC<ProviderProps> = ({ children }) => {
    const [permissions, setPermissions] = useState<{ [key: number]: string }>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [trigger, setTrigger] = useState(0);
    const axios = useAxios();

    //Create enum of permission
    const createEnumFromPermissions = (data: Permission[]) => {
        const enumObject: { [key: number]: string } = {};
        data.forEach(e => {
            enumObject[e.permissionCode] = e.titleEN;
        });
        return enumObject;
    };

    //Load permission list by role
    const loadPermissions = async () => {
        await axios.get("/get-permissions-by-role", {
            params: {
                pageSize: 100
            }
        }).then(({ data }) => {
            if (data && data.succeeded) {
                setPermissions(createEnumFromPermissions(data.data));
            }
        }).finally(() => setTimeout(() => setLoading(false), 300));
    };

    const update = () => {
        window.localStorage.removeItem("permissions");
        setTrigger(prev => prev + 1);
    };

    useEffect(() => {
        loadPermissions();
    }, [trigger]);

    return (
        <PermissionsContext.Provider value={{ permissions, loading, update }}>
            {children}
        </PermissionsContext.Provider>
    )
};

export { MenuContext, MenuProvider, PermissionsContext, PermissionProvider };