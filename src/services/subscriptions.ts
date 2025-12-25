import { supabase } from './supabase'
import {Subscription} from "../types/subscription.ts";
import {useDebugLog} from "../hooks/useDebugLog.ts";

export function mapToSubscription(data: any): Subscription {
    return {
        id: data.id,
        title: data.title || '',
        level: data.level || 0
    };
}

interface SubscriptionRequestResponse {
    success: boolean;
    message: string;
    request_id?: number;
}

export class SubscriptionsService {
    static async getSubscriptions(): Promise<Subscription[] | null> {
        const { data, error } = await supabase
            .from('subscription_tiers')
            .select(`*`);

        if (error) {
            console.error('Error fetching subscription:', error)
            return null
        }

        if (!data) {
            return null
        }

        return data.map(mapToSubscription);
    }

    static async requestSubscription(tierId: string, comment?: string): Promise<SubscriptionRequestResponse> {
        try {
            const tiers = await this.getSubscriptions();

            if (!tiers) {
                return {
                    success: false,
                    message: 'Tiers not found'
                }
            }

            const tier = tiers.find(t => t.id === tierId);

            if (!tier) {
                return {
                    success: false,
                    message: 'Tier not found'
                };
            }

            const { debugLog } = useDebugLog();

            if (tier.level < 900) {

                const { error } = await supabase.rpc('assign_tier', {
                    p_tier_id: tierId
                });

                if (error) {
                    console.error('Error assigning tier:', error);
                    return {
                        success: false,
                        message: error.message
                    };
                }

                debugLog('subscription_tier_assigned', tier);

                return {
                    success: true,
                    message: 'Tier automatically assigned (level < 900)'
                };

            } else {
                const { data: requestId, error } = await supabase.rpc('submit_tier_request', {
                    p_tier_id: tierId,
                    p_comment: comment || null
                });

                if (error) {
                    console.error('Error submitting tier request:', error);
                    return {
                        success: false,
                        message: error.message
                    };
                }

                debugLog('subscription_tier_requested', tier);

                return {
                    success: true,
                    message: 'Subscription request submitted for approval',
                    request_id: requestId
                };
            }

        } catch (error: any) {
            console.error('Unexpected error in requestSubscription:', error);
            return {
                success: false,
                message: error.message || 'An unexpected error occurred'
            };
        }
    }
}