import{j as i}from"./index-CI2t0Kcl.js";import{c as f,d as w}from"./vendor-states-DZ3I310s.js";import{S as y}from"./subscription-FqFoPRqc.js";const b=1,h=9,v=(t,e,s)=>({params:{term:void 0,order:void 0,limit:void 0,sortBy:void 0,page:void 0,tier:void 0,hideUnavailable:void 0},initialized:!1,setParams:o=>{const{params:n}=e();t({params:{...n,...o},initialized:!0},!1,"setParams")},resetParams:()=>{t(s.getInitialState,!0,"resetParams")}}),k=f()(w(v,{name:"searchStore"})),P=()=>k.getState(),S={like:"like",dislike:"dislike",hot:"hot",sequel_request:"sequel_request"};function q(t){const e=t.post_tags?.flatMap(r=>r.tags),s=t.post_metadata?{explicitness:t.post_metadata.explicitness,slug:t.post_metadata.slug}:void 0,o=t.post_transformations?.map(r=>({from:r.from_value,to:r.to_value,type:r.type}))||[],n=t.post_warnings,c=t.post_contents?.picture_url,p=t.post_contents?.summary,a=t.post_contents?.title,_=Object.keys(S),l=Object.fromEntries(_.map(r=>[r,0]));t.reaction_counts_per_post?.forEach(r=>{r.reaction in l&&(l[r.reaction]=r.reaction_count)});const u=t.post_subscription_details;return{id:t.id,title:a,pictureUrl:c,summary:p,tags:e,metadata:s,warnings:n,reactions:l,subscriptions:u,views:t.post_views?.views??0,commentCount:t.post_comment_counts?.comment_count??0,transformations:o,createdAt:t.created_at??new Date().toISOString(),updatedAt:t.created_at??new Date().toISOString()}}function I(t){return/true/i.test(t??"false")}function E(t){return t?"true":"false"}function T(t){try{return{id:t.id,isPublished:t.is_published,title:t.post_contents.title,content:t.post_contents.content,createdAt:t.created_at,metadata:{id:t.id,...t.post_metadata},tags:t.post_tags.flatMap(e=>e.tags),slug:t.post_metadata.slug,references:t.post_references.map(e=>({...e,pictureUrl:e.picture_url})),warnings:t.post_warnings,relatedPosts:t.post_relations.filter(e=>!!e.post_b_id).map(e=>({id:e.post_b_id.id,title:e.post_b_id.post_contents?.title,summary:e.post_b_id.post_contents?.summary,createdAt:e.post_b_id.created_at,slug:e.post_b_id.post_metadata?.slug,pictureUrl:e.post_b_id.post_contents?.picture_url,requiredRoles:e.post_b_id.post_access_roles?.map(s=>s.role_key)})),userAgreement:t.user_agreements.length>0&&t.user_agreements[0].is_agreed}}catch(e){throw console.error(e),e}}function U(t){return{id:t.id,title:t.post_contents.title,slug:t.post_metadata.slug}}const d=y.filter(t=>t.key==="acolyte"||t.key==="high-priest"||t.key==="cult-leader").sort((t,e)=>t.rank-e.rank);function A(t){const e=d.find(s=>s.key===t);return e?d.filter(s=>s.rank<e.rank).map(s=>s.key):[]}async function O(){const t=P().params,e=t.page?parseInt(t.page):b,s=t.limit?parseInt(t.limit):h,o=(e-1)*s,n=o+s-1,c=I(t.hideUnavailable),p=await i();let a=p.schema("blog").from("posts").select(`
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
        `,{count:"exact"}).range(o,n);if(c&&(a=a.not("post_contents","is",null)),t.term)if(t.term.startsWith("#")){const r=t.term.slice(1),m=await p.schema("blog").from("tags").select("id").ilike("value",`%${r}%`).single();if(m.data){const g=m.data.id;a=a.not("post_tags","is",null).eq("post_tags.tag_id",g)}else return{total:0,posts:[]}}else a=a.not("post_contents","is",null).not("post_contents.title","is",null).ilike("post_contents.title",`%${t.term}%`);if(t.tier){a=a.eq("selected_tier.key",t.tier);const r=A(t.tier);r.length>0&&(a=a.in("lower_tiers.key",r).is("lower_tiers",null))}t.sortBy==="alphabet"?a=a.order("post_contents(title)",{ascending:t.order==="asc",nullsFirst:!1}):a=a.order("created_at",{ascending:t.order==="asc"});const{data:_,error:l,count:u}=await a;if(l)throw l;return{total:u??0,posts:_?.map(q)??[]}}async function z(t){const{slug:e,id:s}=t;let n=(await i()).schema("blog").from("posts").select(`
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
        `);if(e)n=n.eq("post_metadata.slug",e),n=n.not("post_metadata","is",null);else if(s)n=n.eq("id",s);else throw new Error("No valid identifier provided for post.");const{data:c,error:p}=await n.single();if(p)throw p;return T(c)}async function F(t){const e=await i();delete t.slug;const{data:s,error:o}=await e.schema("blog").rpc("create_post",t).select("*").single();if(!s)throw new Error("Internal server error.");if(o)throw o;return s}async function M(t){const e=await i(),{error:s}=await e.schema("blog").from("posts").update({is_published:!0}).eq("id",t);if(s)throw s}async function D(t){const e=await i(),{error:s}=await e.schema("blog").from("posts").update({is_published:!1}).eq("id",t);if(s)throw s}async function K(t,e){const s=await i(),{error:o}=await s.schema("blog").rpc("update_post",{post_id:t,...e}).select("*").single();if(o)throw o}async function L(t){const e=await i();(await e.auth.getUser()).data.user&&await e.schema("blog").from("user_agreements").insert({post_id:t,is_agreed:!0})}async function Q(t){const e=await i(),{data:s,error:o}=await e.schema("blog").from("posts").select(`
            *,
            post_contents(title, content, summary, picture_url),
            post_metadata(explicitness, slug),
            post_tags(tags(value)),
            post_warnings(id, level, text),
            post_transformations(id, type, from_value, to_value),
            post_references(id, url, name, picture_url, description, type),
            post_access_roles(role_key),
            post_relations:post_relations_post_a_id_fkey(post_b_id)
        `).eq("id",t).single();if(o||!s)throw o;const n=s?.post_tags?.flatMap(c=>c.tags)??[];return{slug:s.post_metadata.slug,title:s.post_contents.title,summary:s.post_contents.summary,picture_url:s.post_contents.picture_url,content:s.post_contents.content,explicitness:s.post_metadata.explicitness,tags:n,transformations:s.post_transformations,post_references:s.post_references,warnings:s.post_warnings,required_roles:s.post_access_roles,related_posts:s.post_relations.map(c=>({id:c.post_b_id}))}}async function W(){const t=await i(),{data:e,error:s}=await t.schema("blog").from("posts").select(`
            id,
            post_contents (title),
            post_metadata (slug)
        `);return!e||s?[]:e.map(U)}async function $(t){await(await i()).schema("blog").rpc("increment_post_views",{p_post_id:t})}export{d as P,S as R,b as a,L as b,z as c,h as d,F as e,K as f,O as g,D as h,$ as i,Q as j,W as k,I as l,M as p,E as s,k as u};
