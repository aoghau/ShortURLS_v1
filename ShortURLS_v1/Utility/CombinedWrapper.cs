namespace ShortURLS_v1.Utility
{
    public class CombinedWrapper<T>
    {
        public CombinedWrapper() { }
        public T[] List { get; set; }
        public string WrapName { get; set; }       
        public bool IsWrapAdmin { get; set; }
    }
}
