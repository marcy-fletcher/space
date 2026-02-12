import{h as i}from"./index-BTO4W0_s.js";import{c as g,d as f}from"./vendor-states-BrjWHaJB.js";const w=1,b=9,h=(t,s,e)=>({params:{term:void 0,order:void 0,limit:void 0,sortBy:void 0,page:void 0,hideUnavailable:void 0},initialized:!1,setParams:a=>{const{params:o}=s();t({params:{...o,...a},initialized:!0},!1,"setParams")},resetParams:()=>{t(e.getInitialState,!0,"resetParams")}}),y=g()(f(h,{name:"searchStore"})),v=()=>y.getState(),P={like:"like",dislike:"dislike",hot:"hot",sequel_request:"sequel_request"};function k(t){const s=t.post_tags?.flatMap(n=>n.tags),e=t.post_metadata?{explicitness:t.post_metadata.explicitness,slug:t.post_metadata.slug}:void 0,a=t.post_transformations?.map(n=>({from:n.from_value,to:n.to_value,type:n.type}))||[],o=t.post_warnings,c=t.post_contents?.picture_url,p=t.post_contents?.summary,r=t.post_contents?.title,_=Object.keys(P),l=Object.fromEntries(_.map(n=>[n,0]));t.reaction_counts_per_post?.forEach(n=>{n.reaction in l&&(l[n.reaction]=n.reaction_count)});const u=t.post_subscription_details;return{id:t.id,title:r,pictureUrl:c,summary:p,tags:s,metadata:e,warnings:o,reactions:l,subscriptions:u,views:t.post_views?.views??0,commentCount:t.post_comment_counts?.comment_count??0,transformations:a,createdAt:t.created_at??new Date().toISOString(),updatedAt:t.created_at??new Date().toISOString()}}function S(t){return/true/i.test(t??"false")}function x(t){return t?"true":"false"}function q(t){try{return{id:t.id,isPublished:t.is_published,title:t.post_contents.title,content:t.post_contents.content,createdAt:t.created_at,metadata:{id:t.id,...t.post_metadata},tags:t.post_tags.flatMap(s=>s.tags),slug:t.post_metadata.slug,references:t.post_references.map(s=>({...s,pictureUrl:s.picture_url})),warnings:t.post_warnings,relatedPosts:t.post_relations.filter(s=>!!s.post_b_id).map(s=>({id:s.post_b_id.id,title:s.post_b_id.post_contents?.title,summary:s.post_b_id.post_contents?.summary,createdAt:s.post_b_id.created_at,slug:s.post_b_id.post_metadata?.slug,pictureUrl:s.post_b_id.post_contents?.picture_url,requiredRoles:s.post_b_id.post_access_roles?.map(e=>e.role_key)})),userAgreement:t.user_agreements.length>0&&t.user_agreements[0].is_agreed}}catch(s){throw console.error(s),s}}function I(t){return{id:t.id,title:t.post_contents.title,slug:t.post_metadata.slug}}async function B(){const t=v().params,s=t.page?parseInt(t.page):w,e=t.limit?parseInt(t.limit):b,a=(s-1)*e,o=a+e-1,c=S(t.hideUnavailable),p=await i();let r=p.schema("blog").from("posts").select(`
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
        `,{count:"exact"}).range(a,o);if(c&&(r=r.not("post_contents","is",null)),t.term)if(t.term.startsWith("#")){const n=t.term.slice(1),m=await p.schema("blog").from("tags").select("id").ilike("value",`%${n}%`).single();if(m.data){const d=m.data.id;r=r.not("post_tags","is",null).eq("post_tags.tag_id",d)}else return{total:0,posts:[]}}else r=r.not("post_contents","is",null).not("post_contents.title","is",null).ilike("post_contents.title",`%${t.term}%`);t.sortBy==="alphabet"?r=r.order("post_contents(title)",{ascending:t.order==="asc",nullsFirst:!1}):r=r.order("created_at",{ascending:t.order==="asc"});const{data:_,error:l,count:u}=await r;if(l)throw l;return{total:u??0,posts:_?.map(k)??[]}}async function E(t){const{slug:s,id:e}=t;let o=(await i()).schema("blog").from("posts").select(`
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
        `);if(s)o=o.eq("post_metadata.slug",s),o=o.not("post_metadata","is",null);else if(e)o=o.eq("id",e);else throw new Error("No valid identifier provided for post.");const{data:c,error:p}=await o.single();if(p)throw p;return q(c)}async function O(t){const s=await i();delete t.slug;const{data:e,error:a}=await s.schema("blog").rpc("create_post",t).select("*").single();if(!e)throw new Error("Internal server error.");if(a)throw a;return e}async function T(t){const s=await i(),{error:e}=await s.schema("blog").from("posts").update({is_published:!0}).eq("id",t);if(e)throw e}async function j(t){const s=await i(),{error:e}=await s.schema("blog").from("posts").update({is_published:!1}).eq("id",t);if(e)throw e}async function z(t,s){const e=await i(),{error:a}=await e.schema("blog").rpc("update_post",{post_id:t,...s}).select("*").single();if(a)throw a}async function M(t){const s=await i();(await s.auth.getUser()).data.user&&await s.schema("blog").from("user_agreements").insert({post_id:t,is_agreed:!0})}async function D(t){const s=await i(),{data:e,error:a}=await s.schema("blog").from("posts").select(`
            *,
            post_contents(title, content, summary, picture_url),
            post_metadata(explicitness, slug),
            post_tags(tags(value)),
            post_warnings(id, level, text),
            post_transformations(id, type, from_value, to_value),
            post_references(id, url, name, picture_url, description, type),
            post_access_roles(role_key),
            post_relations:post_relations_post_a_id_fkey(post_b_id)
        `).eq("id",t).single();if(a||!e)throw a;const o=e?.post_tags?.flatMap(c=>c.tags)??[];return{slug:e.post_metadata.slug,title:e.post_contents.title,summary:e.post_contents.summary,picture_url:e.post_contents.picture_url,content:e.post_contents.content,explicitness:e.post_metadata.explicitness,tags:o,transformations:e.post_transformations,post_references:e.post_references,warnings:e.post_warnings,required_roles:e.post_access_roles,related_posts:e.post_relations.map(c=>({id:c.post_b_id}))}}async function F(){const t=await i(),{data:s,error:e}=await t.schema("blog").from("posts").select(`
            id,
            post_contents (title),
            post_metadata (slug)
        `);return!s||e?[]:s.map(I)}async function Q(t){await(await i()).schema("blog").rpc("increment_post_views",{p_post_id:t})}export{P as R,w as a,M as b,E as c,b as d,O as e,z as f,B as g,j as h,Q as i,D as j,F as k,S as l,T as p,x as s,y as u};
