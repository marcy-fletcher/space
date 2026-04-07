import{j as i}from"./index-BnNtSyHf.js";import{c as f,d as w}from"./vendor-states-DZ3I310s.js";import{S as y}from"./subscription-FqFoPRqc.js";const b=1,h=9,v=(t,e,s)=>({params:{term:void 0,order:void 0,limit:void 0,sortBy:void 0,page:void 0,tier:void 0,hideUnavailable:void 0},initialized:!1,setParams:a=>{const{params:r}=e();t({params:{...r,...a},initialized:!0},!1,"setParams")},resetParams:()=>{t(s.getInitialState,!0,"resetParams")}}),k=f()(w(v,{name:"searchStore"})),P=()=>k.getState(),S={like:"like",dislike:"dislike",hot:"hot",sequel_request:"sequel_request"};function q(t){const e=t.post_tags?.flatMap(n=>n.tags),s=t.post_metadata?{explicitness:t.post_metadata.explicitness,slug:t.post_metadata.slug}:void 0,a=t.post_transformations?.map(n=>({from:n.from_value,to:n.to_value,type:n.type}))||[],r=t.post_warnings,c=t.post_contents?.picture_url,p=t.post_contents?.summary,o=t.post_contents?.title,_=Object.keys(S),l=Object.fromEntries(_.map(n=>[n,0]));t.reaction_counts_per_post?.forEach(n=>{n.reaction in l&&(l[n.reaction]=n.reaction_count)});const u=t.post_subscription_details;return{id:t.id,title:o,pictureUrl:c,summary:p,tags:e,metadata:s,warnings:r,reactions:l,subscriptions:u,views:t.post_views?.views??0,commentCount:t.post_comment_counts?.comment_count??0,transformations:a,createdAt:t.created_at??new Date().toISOString(),updatedAt:t.created_at??new Date().toISOString()}}function I(t){return/true/i.test(t??"false")}function E(t){return t?"true":"false"}function x(t){try{return{id:t.id,isPublished:t.is_published,title:t.post_contents.title,content:t.post_contents.content,createdAt:t.created_at,metadata:{id:t.id,...t.post_metadata},tags:t.post_tags.flatMap(e=>e.tags),slug:t.post_metadata.slug,references:t.post_references.map(e=>({...e,pictureUrl:e.picture_url})),warnings:t.post_warnings,relatedPosts:t.post_relations.filter(e=>!!e.post_b_id).map(e=>({id:e.post_b_id.id,title:e.post_b_id.post_contents?.title,summary:e.post_b_id.post_contents?.summary,createdAt:e.post_b_id.created_at,slug:e.post_b_id.post_metadata?.slug,pictureUrl:e.post_b_id.post_contents?.picture_url,requiredRoles:e.post_b_id.post_access_roles?.map(s=>s.role_key)})),userAgreement:t.user_agreements.length>0&&t.user_agreements[0].is_agreed}}catch(e){throw console.error(e),e}}function T(t){return{id:t.id,title:t.post_contents.title,slug:t.post_metadata.slug}}const d=y.filter(t=>t.key==="acolyte"||t.key==="high-priest"||t.key==="cult-leader").sort((t,e)=>t.rank-e.rank);function U(t){const e=d.find(s=>s.key===t);return e?d.filter(s=>s.rank<e.rank).map(s=>s.key):[]}async function O(){const t=P().params,e=t.page?parseInt(t.page):b,s=t.limit?parseInt(t.limit):h,a=(e-1)*s,r=a+s-1,c=I(t.hideUnavailable),p=await i();let o=t.tier?p.schema("blog").from("posts").select(`
                *,
                post_contents(title, summary, picture_url),
                post_tags(tags(*)),
                post_metadata(
                  explicitness, slug
                ),
                post_transformations(
                  *
                ),
                post_warnings (
                  level, text
                ),
                reaction_counts_per_post(
                  reaction, reaction_count
                ),
                post_subscription_details(
                  id, key, name, rank
                ),
                selected_tier:post_subscription_details!inner(
                  key
                ),
                lower_tiers:post_subscription_details(
                  key
                ),
                post_views(
                  views
                ),
                post_comment_counts(
                  comment_count
                )
            `,{count:"exact"}).range(a,r):p.schema("blog").from("posts").select(`
                *,
                post_contents(title, summary, picture_url),
                post_tags(tags(*)),
                post_metadata(
                  explicitness, slug
                ),
                post_transformations(
                  *
                ),
                post_warnings (
                  level, text
                ),
                reaction_counts_per_post(
                  reaction, reaction_count
                ),
                post_subscription_details(
                  id, key, name, rank
                ),
                post_views(
                  views
                ),
                post_comment_counts(
                  comment_count
                )
            `,{count:"exact"}).range(a,r);if(c&&(o=o.not("post_contents","is",null)),t.term)if(t.term.startsWith("#")){const n=t.term.slice(1),m=await p.schema("blog").from("tags").select("id").ilike("value",`%${n}%`).single();if(m.data){const g=m.data.id;o=o.not("post_tags","is",null).eq("post_tags.tag_id",g)}else return{total:0,posts:[]}}else o=o.not("post_contents","is",null).not("post_contents.title","is",null).ilike("post_contents.title",`%${t.term}%`);if(t.tier){o=o.eq("selected_tier.key",t.tier);const n=U(t.tier);n.length>0&&(o=o.in("lower_tiers.key",n).is("lower_tiers",null))}t.sortBy==="alphabet"?o=o.order("post_contents(title)",{ascending:t.order==="asc",nullsFirst:!1}):o=o.order("created_at",{ascending:t.order==="asc"});const{data:_,error:l,count:u}=await o;if(l)throw l;return{total:u??0,posts:_?.map(q)??[]}}async function z(t){const{slug:e,id:s}=t;let r=(await i()).schema("blog").from("posts").select(`
            *,
            post_contents(title, content),
            post_metadata(explicitness, slug),
            post_tags(tags(value)),
            post_warnings(level, text),
            post_transformations(id, type, from_value, to_value),
            post_references(url, name, picture_url, description, type),
            post_relations:post_relations_post_a_id_fkey(
                post_b_id(
                    id,
                    created_at,
                    post_contents(title, summary, picture_url),
                    post_metadata(slug),
                    post_access_roles(role_key)
                )
            ),
            user_agreements(is_agreed)
        `);if(e)r=r.eq("post_metadata.slug",e),r=r.not("post_metadata","is",null);else if(s)r=r.eq("id",s);else throw new Error("No valid identifier provided for post.");const{data:c,error:p}=await r.single();if(p)throw p;return x(c)}async function F(t){const e=await i();delete t.slug;const{data:s,error:a}=await e.schema("blog").rpc("create_post",t).select("*").single();if(!s)throw new Error("Internal server error.");if(a)throw a;return s}async function M(t){const e=await i(),{error:s}=await e.schema("blog").from("posts").update({is_published:!0}).eq("id",t);if(s)throw s}async function D(t){const e=await i(),{error:s}=await e.schema("blog").from("posts").update({is_published:!1}).eq("id",t);if(s)throw s}async function K(t,e){const s=await i(),{error:a}=await s.schema("blog").rpc("update_post",{post_id:t,...e}).select("*").single();if(a)throw a}async function L(t){const e=await i();(await e.auth.getUser()).data.user&&await e.schema("blog").from("user_agreements").insert({post_id:t,is_agreed:!0})}async function Q(t){const e=await i(),{data:s,error:a}=await e.schema("blog").from("posts").select(`
            *,
            post_contents(title, content, summary, picture_url),
            post_metadata(explicitness, slug),
            post_tags(tags(value)),
            post_warnings(id, level, text),
            post_transformations(id, type, from_value, to_value),
            post_references(id, url, name, picture_url, description, type),
            post_access_roles(role_key),
            post_relations:post_relations_post_a_id_fkey(post_b_id)
        `).eq("id",t).single();if(a||!s)throw a;const r=s?.post_tags?.flatMap(c=>c.tags)??[];return{slug:s.post_metadata.slug,title:s.post_contents.title,summary:s.post_contents.summary,picture_url:s.post_contents.picture_url,content:s.post_contents.content,explicitness:s.post_metadata.explicitness,tags:r,transformations:s.post_transformations,post_references:s.post_references,warnings:s.post_warnings,required_roles:s.post_access_roles,related_posts:s.post_relations.map(c=>({id:c.post_b_id}))}}async function W(){const t=await i(),{data:e,error:s}=await t.schema("blog").from("posts").select(`
            id,
            post_contents (title),
            post_metadata (slug)
        `);return!e||s?[]:e.map(T)}async function $(t){await(await i()).schema("blog").rpc("increment_post_views",{p_post_id:t})}export{d as P,S as R,b as a,L as b,z as c,h as d,F as e,K as f,O as g,D as h,$ as i,Q as j,W as k,I as l,M as p,E as s,k as u};
