import Role from '../models/Role.js';

const initializeRoles = async () => {
    const defaultRoles = [
        { name: 'Super Admin', permissions: ['all'] },
        { name: 'Admin', permissions: ['manage_users', 'view_reports'] },
        { name: 'Finance', permissions: ['manage_finances'] },
        { name: 'Member', permissions: [] }, // Default role with no special permissions
    ];
    
    for (const role of defaultRoles) {
        const existingRole = await Role.findOne({ name: role.name });
        if (!existingRole) {
            await Role.create(role);
            console.log(`Role ${role.name} created.`);
        }
    }
};

export default initializeRoles;
