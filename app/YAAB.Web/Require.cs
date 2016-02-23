using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace YetAnotherAgileBoard.Web
{
    public interface IRequire
    {
        void Script(params string[] scriptReferences);
        void Data(string dataKey, string serializedData);
        void Data(string dataKey, object data);
    }

    public interface IRequireAccessor
    {
        string[] Scripts { get; }
        Dictionary<string, string>  Data { get; }
    }

    public class Require : IRequire, IRequireAccessor
    {
        private readonly IHttpContextAccessor _accessor;

        private HashSet<string> RequiredScripts
        {
            get
            {
                var items = _accessor.HttpContext.Items;
                const string key = "__RequiredScripts__";

                lock (items)
                {
                    if (!items.ContainsKey(key))
                        items[key] = new HashSet<string>();
                    return (HashSet<string>)items[key];
                }
            }
        }
        private Dictionary<string, string> RequiredData
        {
            get
            {
                var items = _accessor.HttpContext.Items;
                const string key = "__RequiredData__";

                lock (items)
                {
                    if (!items.ContainsKey(key))
                        items[key] = new Dictionary<string, string>();
                    return (Dictionary<string, string>)items[key];
                }
            }
        }

        public Require(IHttpContextAccessor accessor)
        {
            if (accessor == null) throw new ArgumentNullException(nameof(accessor));
            _accessor = accessor;
        }

        public void Script(params string[] referencedScripts)
        {
            var requiredScripts = RequiredScripts;
            lock (requiredScripts)
                foreach (var referencedScript in referencedScripts)
                    requiredScripts.Add(referencedScript);
        }

        public void Data(string dataKey, string serializedData)
        {
            var requiredData = RequiredData;
            lock (requiredData)
            {
                RequiredData[dataKey] = serializedData;
            }
        }

        public void Data(string dataKey, object data)
        {
            var serializedData = JsonConvert.SerializeObject(
                data,
                Formatting.Indented,
                new JsonSerializerSettings
                {
                    ContractResolver = new CamelCasePropertyNamesContractResolver()
                });
            Data(dataKey, serializedData);
        }

        string[] IRequireAccessor.Scripts
        {
            get
            {
                var requiredScripts = RequiredScripts;
                lock (requiredScripts)
                    return requiredScripts.ToArray();
            }
        }

        Dictionary<string, string> IRequireAccessor.Data
        {
            get
            {
                var requiredData = RequiredData;
                lock (requiredData)
                {
                    return requiredData
                        .ToDictionary(kv => kv.Key, kv => kv.Value);
                }
            }
        }
    }
}
