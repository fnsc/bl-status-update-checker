import axios from 'axios'
import mailer from "./mailer.js"
import { format } from 'date-fns';


const url = `https://opendata.vancouver.ca/api/records/1.0/search/?disjunctive.status=true&disjunctive.businesssubtype=true&dataChart=eyJxdWVyaWVzIjpbeyJjaGFydHMiOlt7InR5cGUiOiJsaW5lIiwiZnVuYyI6IkNPVU5UIiwieUF4aXMiOiJmZWVwYWlkIiwic2NpZW50aWZpY0Rpc3BsYXkiOnRydWUsImNvbG9yIjoiIzAyNzlCMSJ9XSwieEF4aXMiOiJmb2xkZXJ5ZWFyIiwibWF4cG9pbnRzIjoiIiwidGltZXNjYWxlIjoiIiwic29ydCI6IiIsImNvbmZpZyI6eyJkYXRhc2V0IjoiYnVzaW5lc3MtbGljZW5jZXMiLCJvcHRpb25zIjp7ImRpc2p1bmN0aXZlLnN0YXR1cyI6dHJ1ZSwiZGlzanVuY3RpdmUuYnVzaW5lc3NzdWJ0eXBlIjp0cnVlLCJxIjoiTmV0Y29pbnMiLCJyZWZpbmUuZm9sZGVyeWVhciI6IjIzIn19fV0sImRpc3BsYXlMZWdlbmQiOnRydWUsImFsaWduTW9udGgiOnRydWUsInRpbWVzY2FsZSI6IiJ9&q=netcoins&sort=businessname&refine.folderyear=24&location=22,49.2873,-123.1219&rows=0&facet=folderyear&facet=licencerevisionnumber&facet=status&facet=issueddate&facet=businesstype&facet=businesssubtype&facet=city&facet=province&facet=localarea&facetsort.folderyear=-alphanum&facetsort.issueddate=-alphanum&facetsort.businesstype=alphanum&facetsort.businesssubtype=alphanum&dataset=business-licences&timezone=America%2FLos_Angeles&lang=en`

function getData(response) {
    let status = `${response.data.facet_groups[2].facets[0].name}`
    let year = response.data.facet_groups[0].facets[0].name

    return {status, year};
}

export default async function main () {
    try {
        const response = await axios.get(url)
        let data = getData(response);

        console.log(`bl status => year: ${data.year} | status: ${data.status} | datetime: ${format(new Date(), 'dd/MM/yyyy HH:mm:ss')}`)

        if ('Pending' !== data.status) {
            mailer(data.status)
        }
    } catch (error) {
        console.log(error)
    }
}
