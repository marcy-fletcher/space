// src/services/invites.ts

import { Invite } from '../types/invite';
import {supabase} from "./supabase.ts";

function mapToInvite(dto: any) : Invite {
    return {
        key: dto.key,
        ownerId: dto.owner_id,
        userId: dto.user_id,
        userName: dto.user_profiles?.name,
        expiresAt: dto.expires_at,
        usedAt: dto.used_at,
        createdAt: dto.created_at
    }
}

export interface UseInviteResult {
    success: boolean;
    error: boolean;
    message?: string;
}

export interface CreateInviteResult {
    success: boolean;
    error: boolean;
    message?: string;
    invite?: Invite;
}

export class InviteService {
    static async createInvite(): Promise<CreateInviteResult> {
        const { data, error } = await supabase.rpc('create_invite')
            .select('*')
            .maybeSingle();

        if (error || !data) {
            return {
                success: false,
                error: true,
                message: error?.message ?? "Internal Error"
            }
        }

        return {
            success: true,
            error: false,
            invite: mapToInvite(data)
        }
    }

    static async expireInvite(key: string): Promise<boolean> {
        const { error } = await supabase
            .from('invites')
            .update({ expires_at: new Date().toISOString() })
            .eq('key', key);

        if (error) {
            console.error('Error expiring invite:', error);
            return false;
        }

        return true;
    }

    static async getInvites(): Promise<Invite[]> {
        const { data, error } = await supabase
            .from('invites')
            .select('*, user_profiles!invites_user_id_fkey(name)');

        if (error || !data) {
            console.error('Error expiring invites:', error);
            return [];
        }

        console.log(data);

        return data.map(mapToInvite);
    }

    static async useInvite(key: string): Promise<UseInviteResult> {
        const { data, error } = await supabase
            .rpc('use_invite', {
                key: key
            })
            .select();

        if (error || !data) {
            return {
                success: false,
                error: true
            }
        }

        return data;
    }
}