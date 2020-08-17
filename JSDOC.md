<a name="challongeAPI.module_js"></a>

## challongeAPI.js
Endpoint for every GET method of Challonge API v1.
See https://api.challonge.com/v1 for methods and parameters.

**Requires**: <code>module:node-fetch</code>  
**Author**: Joe Sadoski <jdsadoski@gmail.com>  
**License**: GPL-3.0-or-later  

* [challongeAPI.js](#challongeAPI.module_js)
    * _static_
        * [.APIMethod](#challongeAPI.module_js..APIMethod)
            * [new APIMethod(key)](#new_challongeAPI.module_js..APIMethod_new)
    * _inner_
        * [~API](#challongeAPI.module_js..API)
            * [new API(key)](#new_challongeAPI.module_js..API_new)
            * [.tournaments](#challongeAPI.module_js..API+tournaments) ⇒ <code>Tournament</code>
            * [.participants](#challongeAPI.module_js..API+participants) ⇒ <code>Participant</code>
            * [.match](#challongeAPI.module_js..API+match) ⇒ <code>Match</code>
            * [.matchAttachments](#challongeAPI.module_js..API+matchAttachments) ⇒ <code>Attachment</code>
        * [~Tournament](#challongeAPI.module_js..Tournament) ⇐ <code>APIMethod</code>
            * [new Tournament()](#new_challongeAPI.module_js..Tournament_new)
            * [.index](#challongeAPI.module_js..Tournament+index) ⇒ <code>Promise</code>
            * [.show](#challongeAPI.module_js..Tournament+show) ⇒ <code>Promise</code>
        * [~Participant](#challongeAPI.module_js..Participant) ⇐ <code>APIMethod</code>
            * [new Participant()](#new_challongeAPI.module_js..Participant_new)
            * [.index](#challongeAPI.module_js..Participant+index) ⇒ <code>Promise</code>
            * [.show](#challongeAPI.module_js..Participant+show) ⇒ <code>Promise</code>
        * [~Match](#challongeAPI.module_js..Match) ⇐ <code>APIMethod</code>
            * [new Match()](#new_challongeAPI.module_js..Match_new)
            * [.index](#challongeAPI.module_js..Match+index) ⇒ <code>Promise</code>
            * [.show](#challongeAPI.module_js..Match+show) ⇒ <code>Promise</code>
        * [~Attachment](#challongeAPI.module_js..Attachment) ⇐ <code>APIMethod</code>
            * [new Attachment()](#new_challongeAPI.module_js..Attachment_new)
            * [.index](#challongeAPI.module_js..Attachment+index) ⇒ <code>Promise</code>
            * [.show](#challongeAPI.module_js..Attachment+show) ⇒ <code>Promise</code>

<a name="challongeAPI.module_js..APIMethod"></a>

### challongeAPI.js.APIMethod
Base class for API Methods

**Kind**: static class of [<code>challongeAPI.js</code>](#challongeAPI.module_js)  
<a name="new_challongeAPI.module_js..APIMethod_new"></a>

#### new APIMethod(key)
Creates an instance of APIMethod.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | Your API key |

<a name="challongeAPI.module_js..API"></a>

### challongeAPI.js~API
Base class for Challonge API.

**Kind**: inner class of [<code>challongeAPI.js</code>](#challongeAPI.module_js)  

* [~API](#challongeAPI.module_js..API)
    * [new API(key)](#new_challongeAPI.module_js..API_new)
    * [.tournaments](#challongeAPI.module_js..API+tournaments) ⇒ <code>Tournament</code>
    * [.participants](#challongeAPI.module_js..API+participants) ⇒ <code>Participant</code>
    * [.match](#challongeAPI.module_js..API+match) ⇒ <code>Match</code>
    * [.matchAttachments](#challongeAPI.module_js..API+matchAttachments) ⇒ <code>Attachment</code>

<a name="new_challongeAPI.module_js..API_new"></a>

#### new API(key)
Creates an instance of API.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The API key. |

<a name="challongeAPI.module_js..API+tournaments"></a>

#### apI.tournaments ⇒ <code>Tournament</code>
Gets a tournament or tournaments. Use .index() or .show()

**Kind**: instance property of [<code>API</code>](#challongeAPI.module_js..API)  
<a name="challongeAPI.module_js..API+participants"></a>

#### apI.participants ⇒ <code>Participant</code>
Gets participants of the given tournament. Use .index()) or .show()

**Kind**: instance property of [<code>API</code>](#challongeAPI.module_js..API)  
**Returns**: <code>Participant</code> - An object containing .index() and .show()  
<a name="challongeAPI.module_js..API+match"></a>

#### apI.match ⇒ <code>Match</code>
Gets matches for a given tournament. Use .index() and .show()

**Kind**: instance property of [<code>API</code>](#challongeAPI.module_js..API)  
**Returns**: <code>Match</code> - An object containing .index() and .show()  
<a name="challongeAPI.module_js..API+matchAttachments"></a>

#### apI.matchAttachments ⇒ <code>Attachment</code>
Gets match attachments. Use .index() and .show()

**Kind**: instance property of [<code>API</code>](#challongeAPI.module_js..API)  
**Returns**: <code>Attachment</code> - An object containing .index() and .show()  
**Todo**

- [ ] Create/find test tournament with attachments to test

<a name="challongeAPI.module_js..Tournament"></a>

### challongeAPI.js~Tournament ⇐ <code>APIMethod</code>
**Kind**: inner class of [<code>challongeAPI.js</code>](#challongeAPI.module_js)  
**Extends**: <code>APIMethod</code>  

* [~Tournament](#challongeAPI.module_js..Tournament) ⇐ <code>APIMethod</code>
    * [new Tournament()](#new_challongeAPI.module_js..Tournament_new)
    * [.index](#challongeAPI.module_js..Tournament+index) ⇒ <code>Promise</code>
    * [.show](#challongeAPI.module_js..Tournament+show) ⇒ <code>Promise</code>

<a name="new_challongeAPI.module_js..Tournament_new"></a>

#### new Tournament()
The Tournament method endpoint

<a name="challongeAPI.module_js..Tournament+index"></a>

#### tournament.index ⇒ <code>Promise</code>
Retrieves a set of tournaments created by the account which owns the API key.

**Kind**: instance property of [<code>Tournament</code>](#challongeAPI.module_js..Tournament)  
**Returns**: <code>Promise</code> - A Promise which will contain an Array of tournament objects (JSON)  
**Todo**

- [ ] Implement created_before
- [ ] Implement created_after


| Param | Type | Description |
| --- | --- | --- |
| state | <code>String</code> | all, pending, in_progress, ended |
| t_type | <code>String</code> | single_elimination, double_elimination, round_robin, swiss |
| created_after | <code>Date</code> | !NOT IMPLEMENTED YET! YYYY-MM-DD |
| created_before | <code>Date</code> | !NOT IMPLEMENTED YET! YYYY-MM-DD |
| subdomain | <code>String</code> | A Challonge subdomain you've published tournaments to. |

<a name="challongeAPI.module_js..Tournament+show"></a>

#### tournament.show ⇒ <code>Promise</code>
Retrieves a tournament.

**Kind**: instance property of [<code>Tournament</code>](#challongeAPI.module_js..Tournament)  
**Returns**: <code>Promise</code> - A Promise which will have the tournament object (JSON)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| tournament | <code>String</code> |  | Tournament ID (e.g. 10230) or URL (e.g. 'single_elim' for challonge.com/single_elim). |
| [include_participants] | <code>boolean</code> | <code>false</code> | Includes an array of associated participant records |
| [include_matches] | <code>boolean</code> | <code>false</code> | Includes an array of associated match records |

<a name="challongeAPI.module_js..Participant"></a>

### challongeAPI.js~Participant ⇐ <code>APIMethod</code>
**Kind**: inner class of [<code>challongeAPI.js</code>](#challongeAPI.module_js)  
**Extends**: <code>APIMethod</code>  

* [~Participant](#challongeAPI.module_js..Participant) ⇐ <code>APIMethod</code>
    * [new Participant()](#new_challongeAPI.module_js..Participant_new)
    * [.index](#challongeAPI.module_js..Participant+index) ⇒ <code>Promise</code>
    * [.show](#challongeAPI.module_js..Participant+show) ⇒ <code>Promise</code>

<a name="new_challongeAPI.module_js..Participant_new"></a>

#### new Participant()
The Participant

<a name="challongeAPI.module_js..Participant+index"></a>

#### participant.index ⇒ <code>Promise</code>
Returns all the participants of the given tournament.

**Kind**: instance property of [<code>Participant</code>](#challongeAPI.module_js..Participant)  
**Returns**: <code>Promise</code> - A Promise which will contain an Array of participant objects (JSON)  
<a name="challongeAPI.module_js..Participant+show"></a>

#### participant.show ⇒ <code>Promise</code>
Returns a participant at the given ID

**Kind**: instance property of [<code>Participant</code>](#challongeAPI.module_js..Participant)  
**Returns**: <code>Promise</code> - A promise which will contain a participant object (JSON)  

| Param | Type | Description |
| --- | --- | --- |
| participant_id | <code>String</code> | The participant's unique ID |

<a name="challongeAPI.module_js..Match"></a>

### challongeAPI.js~Match ⇐ <code>APIMethod</code>
**Kind**: inner class of [<code>challongeAPI.js</code>](#challongeAPI.module_js)  
**Extends**: <code>APIMethod</code>  

* [~Match](#challongeAPI.module_js..Match) ⇐ <code>APIMethod</code>
    * [new Match()](#new_challongeAPI.module_js..Match_new)
    * [.index](#challongeAPI.module_js..Match+index) ⇒ <code>Promise</code>
    * [.show](#challongeAPI.module_js..Match+show) ⇒ <code>Promise</code>

<a name="new_challongeAPI.module_js..Match_new"></a>

#### new Match()
The Match method endpoint

<a name="challongeAPI.module_js..Match+index"></a>

#### match.index ⇒ <code>Promise</code>
Returns all the matches for the given tournament.

**Kind**: instance property of [<code>Match</code>](#challongeAPI.module_js..Match)  
**Returns**: <code>Promise</code> - Will contain an Array containing
 match objects (JSON).  
<a name="challongeAPI.module_js..Match+show"></a>

#### match.show ⇒ <code>Promise</code>
Returns a match for the given tournament and match_id

**Kind**: instance property of [<code>Match</code>](#challongeAPI.module_js..Match)  
**Returns**: <code>Promise</code> - Will contain a match object (JSON)  
**Todo**

- [ ] add include_attachments parameter


| Param | Type | Description |
| --- | --- | --- |
| match_id | <code>String</code> | The match's unique ID |

<a name="challongeAPI.module_js..Attachment"></a>

### challongeAPI.js~Attachment ⇐ <code>APIMethod</code>
**Kind**: inner class of [<code>challongeAPI.js</code>](#challongeAPI.module_js)  
**Extends**: <code>APIMethod</code>  

* [~Attachment](#challongeAPI.module_js..Attachment) ⇐ <code>APIMethod</code>
    * [new Attachment()](#new_challongeAPI.module_js..Attachment_new)
    * [.index](#challongeAPI.module_js..Attachment+index) ⇒ <code>Promise</code>
    * [.show](#challongeAPI.module_js..Attachment+show) ⇒ <code>Promise</code>

<a name="new_challongeAPI.module_js..Attachment_new"></a>

#### new Attachment()
The Attachment method endpoint

<a name="challongeAPI.module_js..Attachment+index"></a>

#### attachment.index ⇒ <code>Promise</code>
Retrieve a match's attachments.

**Kind**: instance property of [<code>Attachment</code>](#challongeAPI.module_js..Attachment)  
**Returns**: <code>Promise</code> - A Promise containing an Array with attachment objects (JSON)  

| Param | Type |
| --- | --- |
| tournament | <code>String</code> | 
| match | <code>String</code> | 

<a name="challongeAPI.module_js..Attachment+show"></a>

#### attachment.show ⇒ <code>Promise</code>
Retrieve a match's attachments.

**Kind**: instance property of [<code>Attachment</code>](#challongeAPI.module_js..Attachment)  
**Returns**: <code>Promise</code> - A Promise containing the attachment (JSON)  

| Param | Type | Description |
| --- | --- | --- |
| tournament | <code>String</code> | Tournament ID (e.g. 10230) or URL (e.g. 'single_elim' for challonge.com/single_elim) |
| attachment_id | <code>String</code> | The match's unique ID |

