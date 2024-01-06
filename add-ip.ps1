$username = ""
$password = ""
$tenant = ""
$resouce_group = "KaruscRG"
$server_name = "karusc-db-dev"
$rule_name = "<your-name>"

if($rule_name -ne "<your-name>")
{
    $ip_address = Invoke-WebRequest -Uri https://api.ipify.org/
    az login --service-principal --username $username --password $password --tenant $tenant
    az mysql flexible-server firewall-rule update --resource-group $resouce_group  --name $server_name --rule-name $rule_name --start-ip-address $ip_address --end-ip-address $ip_address 
    az logout
    Write-Host "All done!! You can close this window now"
}
else
{
    Write-Host "Error: rule_name must be your name!, Please retry."
}

